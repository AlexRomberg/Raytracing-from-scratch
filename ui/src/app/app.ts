import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';

const ROWS_PER_CHUNK = 10;

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    "(window:resize)": "onResize()"
  }
})
export class App {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('raytracerCanvas');
  private windowSize = signal({ width: window.innerWidth, height: window.innerHeight });
  private workers: Worker[] = [];

  constructor() {
    const numWorkers = navigator.hardwareConcurrency || 4;
    for (let i = 0; i < numWorkers; i++) {
      this.workers.push(new Worker(new URL('./render.worker', import.meta.url), { type: 'module' }));
    }

    effect(() => {
      const canvas = this.canvas();
      if (!canvas) return;

      const { width, height } = this.windowSize();
      canvas.nativeElement.width = width;
      canvas.nativeElement.height = height;

      this.renderParallel(width, height, canvas.nativeElement);
    });
  }

  onResize() {
    this.windowSize.set({ width: window.innerWidth, height: window.innerHeight });
  }

  private renderParallel(width: number, height: number, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(width, height);
    const pixels = imageData.data;

    const chunks: { startRow: number; endRow: number }[] = [];
    for (let row = 0; row < height; row += ROWS_PER_CHUNK) {
      chunks.push({ startRow: row, endRow: Math.min(row + ROWS_PER_CHUNK, height) });
    }

    let completed = 0;
    const total = chunks.length;

    const dispatch = (worker: Worker) => {
      const chunk = chunks.pop();
      if (!chunk) return;

      worker.onmessage = ({ data }: MessageEvent<{ startRow: number; endRow: number; pixels: Uint8Array }>) => {
        const offset = data.startRow * width * 4;
        pixels.set(data.pixels, offset);
        completed++;


        if (completed === total) {
          ctx.putImageData(imageData, 0, 0);
        } else {
          dispatch(worker);
        }
      };

      worker.postMessage({ width, startRow: chunk.startRow, endRow: chunk.endRow });
    };

    for (const worker of this.workers) {
      dispatch(worker);
    }
  }
}
