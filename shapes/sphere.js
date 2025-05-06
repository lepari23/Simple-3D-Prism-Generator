import { sphere } from "https://cdn.jsdelivr.net/npm/@jscad/modeling@2.23.0/+esm";
export const label = "Sphere";
export const defaults = { radius: 20 };

export function make({ radius }) {
  return sphere({ radius });
}
