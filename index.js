/* ---------- external libs ---------- */
import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/controls/OrbitControls.js?module";
import { STLExporter } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/exporters/STLExporter.js?module";

/* ---------- DOM ---------- */
const viewerBox = document.querySelector(".viewer-box");
const canvas = document.getElementById("viewer");
const unitSel = document.getElementById("units");
const shapeSel = document.getElementById("shape");
const paramsUI = document.getElementById("params");
const dlBtn = document.getElementById("download");

/* ---------- scene ---------- */
const scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
scene.add(new THREE.DirectionalLight(0xffffff, 0.9));

const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
cam.position.set(120, 100, 120);
cam.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0x222426);
resize();
window.addEventListener("resize", resize);

const controls = new OrbitControls(cam, renderer.domElement);
controls.enableDamping = true;

function resize() {
  // square box keeps aspect‑ratio 1
  const w = viewerBox.clientWidth;
  renderer.setSize(w, w, false);
  cam.aspect = 1;
  cam.updateProjectionMatrix();
}

/* ---------- units ---------- */
const mmFactor = () => ({ mm: 1, cm: 10, in: 25.4 }[unitSel.value]);

/* ---------- param presets ---------- */
const presets = {
  cube: { width: 20 },
  prism: { width: 20, breadth: 30, height: 15 },
  cylinder: { radius: 15, height: 30 },
  pyramid: { baseWidth: 20, height: 25 },
  sphere: { radius: 20 },
};

/* ---------- build geometry ---------- */
function geomFor(type, p) {
  switch (type) {
    case "cube":
      return new THREE.BoxGeometry(p.width, p.width, p.width);
    case "prism":
      return new THREE.BoxGeometry(p.width, p.height, p.breadth);
    case "cylinder":
      return new THREE.CylinderGeometry(p.radius, p.radius, p.height, 64);
    case "pyramid":
      return new THREE.ConeGeometry(p.baseWidth / Math.SQRT2, p.height, 4);
    case "sphere":
      return new THREE.SphereGeometry(p.radius, 64, 32);
  }
}

/* ---------- state ---------- */
let shape = shapeSel.value;
let current = { ...presets[shape] };
let mesh = null;

/* ---------- UI ---------- */
function renderInputs() {
  paramsUI.innerHTML = "";
  for (const [k, v] of Object.entries(current)) {
    paramsUI.insertAdjacentHTML(
      "beforeend",
      `<label class="control-block">${k}
         <input type="number" step="0.1" min="0.1" value="${v}" data-k="${k}">
       </label>`
    );
  }
}

/* ---------- draw ---------- */
function refresh() {
  const scale = mmFactor();
  const pMM = Object.fromEntries(
    Object.entries(current).map(([k, v]) => [k, v * scale])
  );
  const geom = geomFor(shape, pMM);

  if (mesh) scene.remove(mesh);
  mesh = new THREE.Mesh(
    geom,
    new THREE.MeshStandardMaterial({ color: 0x2194f3, roughness: 0.5 })
  );
  scene.add(mesh);
}

/* ---------- filename helper ---------- */
const abbr = {
  width: "w",
  breadth: "b",
  height: "h",
  radius: "r",
  baseWidth: "bw",
};
// helper trims unnecessary zeros and never multiplies; filenames reflect exact user input
function formatUnits(n) {
  // "2"  -> "2"
  return (+n.toFixed(4)) // "2.0000" -> 2        , "2.5000" -> 2.5
    .toString()
    .replace(".", ","); // 2.5 -> 2,5   (avoids dots in filenames)
}
function fileName() {
  const unit = unitSel.value; // mm / cm / in (selected by user)
  const parts = Object.entries(current)
    .map(([k, v]) => `${abbr[k]}-${formatUnits(v)}`)
    .join("_");
  return `${shape}_${unit}_${parts}.stl`;
}

/* ---------- events ---------- */
paramsUI.addEventListener("input", (e) => {
  if (e.target.dataset.k) {
    current[e.target.dataset.k] = Number(e.target.value);
    refresh();
  }
});
shapeSel.onchange = () => {
  shape = shapeSel.value;
  current = { ...presets[shape] };
  renderInputs();
  refresh();
};
unitSel.onchange = refresh;

dlBtn.onclick = () => {
  const stl = new STLExporter().parse(mesh, { binary: false });
  const blob = new Blob([stl], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: fileName(),
  });
  a.click();
  URL.revokeObjectURL(url);
};

/* ---------- init loop ---------- */
renderInputs();
refresh();
(function loop() {
  requestAnimationFrame(loop);
  controls.update();
  renderer.render(scene, cam);
})();
