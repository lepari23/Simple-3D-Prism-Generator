import { pyramid } from "https://cdn.jsdelivr.net/npm/@jscad/modeling@2.23.0/+esm";
export const label = "Pyramid";
export const defaults = { base: 20, height: 25 };

export function make({ base, height }) {
  return pyramid({ base, height });
}
