import { cuboid } from "https://cdn.jsdelivr.net/npm/@jscad/modeling@2.23.0/+esm";
export const label = "Rectangular Prism";
export const defaults = { width: 20, depth: 30, height: 15 };

export function make({ width, depth, height }) {
  return cuboid({ size: [width, depth, height] });
}
