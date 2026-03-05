/// <reference lib="webworker" />

import init, { render_rows } from "raytracer";

let initialized = false;

addEventListener("message", async ({ data }) => {
  const { width, startRow, endRow } = data as {
    width: number;
    startRow: number;
    endRow: number;
  };

  if (!initialized) {
    await init({ module_or_path: "/raytracer_bg.wasm" });
    initialized = true;
  }

  const pixels = render_rows(width, startRow, endRow);
  postMessage({ startRow, endRow, pixels }, [pixels.buffer] as any);
});
