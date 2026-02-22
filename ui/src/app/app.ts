import { Component, effect, ElementRef, resource, signal, viewChild } from '@angular/core';
import init, { render } from "raytracer";

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
  private wasmModule = resource({
    loader: () => init({ module_or_path: '/raytracer_bg.wasm' }),
  });
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('raytracerCanvas');
  private windowSize = signal({ width: window.innerWidth, height: window.innerHeight });

  constructor() {
    effect(() => {
      if (!this.wasmModule.value()) return;

      const canvas = this.canvas();
      if (!canvas) return;

      const { width, height } = this.windowSize();
      canvas.nativeElement.width = width;
      canvas.nativeElement.height = height;

      render(canvas.nativeElement);
    });
  }

  onResize() {
    this.windowSize.set({ width: window.innerWidth, height: window.innerHeight });
  }
}
