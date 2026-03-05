/// <reference lib="webworker" />

import init, { render_rows } from "raytracer";

let initialized = false;

addEventListener("message", async ({ data }) => {
  const { width, startRow, endRow, sphereData, lightData, diffuseIntensity } = data as {
    width: number;
    startRow: number;
    endRow: number;
    sphereData: Float32Array;
    lightData: Float32Array;
    diffuseIntensity: number;
  };

  if (!initialized) {
    await init({ module_or_path: "/raytracer_bg.wasm" });
    initialized = true;
  }

  const pixels = render_rows(width, startRow, endRow, sphereData, lightData, diffuseIntensity);
  postMessage({ startRow, endRow, pixels }, [pixels.buffer] as any);
});
