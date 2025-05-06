# Simple 3‑D Shape Generator

**Live demo:**  
<https://lepari23.github.io/Simple-3D-Prism-Generator>

A zero‑backend, browser‑only tool that lets you generate and size a few everyday 3‑D shapes, preview them in real time, and download a ready‑to‑print **STL** file.

---

## ✨ Features
| What you can do | Details |
|-----------------|---------|
| **Pick a shape** | Cube&nbsp;/ Rectangular Prism · Cylinder · Pyramid (square base) · Sphere |
| **Set real‑world sizes** | Works in **millimetres (mm)**, **centimetres (cm)** or **inches (in)** &nbsp;→ the STL prints at exactly those dimensions |
| **Drag‑orbit preview** | Rotate, pan and zoom with the mouse (OrbitControls) |
| **Instant STL export** | One click → downloads an ASCII‑STL with a self‑describing filename e.g. `cylinder_cm_r-2,5_h-5.stl` |

---

## 📐 Parameters by shape

| Shape | Inputs |
|-------|--------|
| Cube | `width` |
| Rectangular Prism | `width` · `breadth` · `height` |
| Cylinder | `radius` · `height` |
| Pyramid (square) | `baseWidth` · `height` |
| Sphere | `radius` |

> **Note** — the *unit* you pick in the dropdown is the unit saved in the STL and in the filename; nothing is silently converted.

---

## 🛠 Tech stack
* Pure **HTML / CSS / ES‑Module JavaScript**  
* **[Three.js 0.164](https://threejs.org/)** for realtime view + STL export (no build step)  
* Deployed with **GitHub Pages**

---

## 🚀 Running locally
```bash
# clone
git clone https://github.com/lepari23/Simple-3D-Prism-Generator.git
cd Simple-3D-Prism-Generator

# any static server works; Python’s is easiest
python3 -m http.server 5500
# open http://localhost:5500 in your browser
````

No bundlers, build tools or Node modules required.

---

## 🤝 Contributing / Feedback

* Found a bug? Have an idea for another basic parametric shape?
  → **Open an Issue** with as much detail as you can.
* Pull requests are disabled for now – I’ll review proposals in Issues first.

Thanks for checking it out, and happy printing!