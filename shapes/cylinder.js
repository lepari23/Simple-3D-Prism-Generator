import { cylinder } from "https://cdn.jsdelivr.net/npm/@jscad/modeling@2.23.0/+esm";
export const label = "Cylinder";
export const defaults = { radius: 15, height: 30 };

export function make({ radius, height }) {
  return cylinder({ radius, height });
}
