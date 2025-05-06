import { cube } from "https: //cdn.jsdelivr.net/npm/@jscad/modeling@2.23.0/+esm";
export const label = "Cube";
export const defaults = { width: 20 }; // mm

export function make({ width }) {
  return cube({ width });
}
