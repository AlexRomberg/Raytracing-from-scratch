import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { ScenePanel } from './scene-panel/scene-panel';

@Component({
  selector: 'app-root',
  imports: [ScenePanel],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    "(window:resize)": "onResize()"
  }
})
export class App {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('raytracerCanvas');
  private windowSize = signal({ width: window.innerWidth, height: window.innerHeight });
  private gpuDevice: GPUDevice | null = null;
  private gpuContext: GPUCanvasContext | null = null;
  private gpuFormat: GPUTextureFormat | null = null;
  private renderPipeline: GPURenderPipeline | null = null;
  private gpuInitPromise: Promise<void> | null = null;
  private shaderSourcePromise: Promise<string> | null = null;

  constructor() {
    effect(() => {
      const canvas = this.canvas();
      if (!canvas) return;

      const { width, height } = this.windowSize();
      this.resizeCanvas(canvas.nativeElement, width, height);
      void this.renderBlueScreen(canvas.nativeElement);
    });
  }

  onResize() {
    this.windowSize.set({ width: window.innerWidth, height: window.innerHeight });
  }

  private resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  private async initializeGpu(canvas: HTMLCanvasElement) {
    if (this.gpuInitPromise) {
      return this.gpuInitPromise;
    }

    this.gpuInitPromise = (async () => {
      if (!navigator.gpu) {
        throw new Error('WebGPU is not supported in this browser.');
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error('No WebGPU adapter found.');
      }

      const device = await adapter.requestDevice();
      const context = canvas.getContext('webgpu') as GPUCanvasContext | null;

      if (!context) {
        throw new Error('Could not acquire a WebGPU canvas context.');
      }

      const shaderSource = await this.loadShaderSource();

      const shaderModule = device.createShaderModule({
        code: shaderSource,
      });

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        alphaMode: 'opaque',
      });

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: shaderModule,
          entryPoint: 'vs_main',
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fs_main',
          targets: [{ format }],
        },
        primitive: {
          topology: 'triangle-list',
        },
      });

      this.gpuDevice = device;
      this.gpuContext = context;
      this.gpuFormat = format;
      this.renderPipeline = pipeline;
    })();

    return this.gpuInitPromise;
  }

  private async loadShaderSource() {
    if (this.shaderSourcePromise) {
      return this.shaderSourcePromise;
    }

    this.shaderSourcePromise = fetch('/shaders/fullscreen-cyan.wgsl').then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load shader source: ${response.status}`);
      }

      return response.text();
    });

    return this.shaderSourcePromise;
  }

  private async renderBlueScreen(canvas: HTMLCanvasElement) {
    await this.initializeGpu(canvas);

    if (!this.gpuDevice || !this.gpuContext || !this.renderPipeline || !this.gpuFormat) {
      return;
    }

    this.gpuContext.configure({
      device: this.gpuDevice,
      format: this.gpuFormat,
      alphaMode: 'opaque',
    });

    const commandEncoder = this.gpuDevice.createCommandEncoder();
    const pass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.gpuContext.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    });

    pass.setPipeline(this.renderPipeline);
    pass.draw(3, 1, 0, 0);
    pass.end();

    this.gpuDevice.queue.submit([commandEncoder.finish()]);
  }
}
