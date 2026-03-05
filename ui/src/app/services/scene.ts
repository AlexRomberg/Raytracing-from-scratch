import { Injectable, signal } from '@angular/core';

export interface SphereConfig {
  name: string;
  cx: number; cy: number; cz: number;
  radius: number;
  r: number; g: number; b: number;
}

export interface LightConfig {
  name: string;
  x: number; y: number; z: number;
  r: number; g: number; b: number;
}

export interface SceneConfig {
  diffuseIntensity: number;
  spheres: SphereConfig[];
  lights: LightConfig[];
}

const DEFAULT_SCENE: SceneConfig = {
  diffuseIntensity: 0.1,
  spheres: [
    { name: 'Blue', cx: 800, cy: 400, cz: 400, radius: 250, r: 0, g: 0, b: 1 },
    { name: 'Red', cx: 800, cy: 400, cz: 150, radius: 50, r: 1, g: 0, b: 0 },
    { name: 'Cyan Left', cx: 710, cy: 310, cz: 330, radius: 150, r: 0, g: 1, b: 1 },
    { name: 'Cyan Right', cx: 890, cy: 310, cz: 330, radius: 150, r: 0, g: 1, b: 1 },
    { name: 'Lime Left', cx: 650, cy: 250, cz: 150, radius: 50, r: 0, g: 1, b: 0 },
    { name: 'Lime Right', cx: 950, cy: 250, cz: 150, radius: 50, r: 0, g: 1, b: 0 },
  ],
  lights: [
    { name: 'Main Light', x: 800, y: 300, z: -400, r: 1, g: 1, b: 1 },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class Scene {
  scene = signal<SceneConfig>(structuredClone(DEFAULT_SCENE));

  update(partial: Partial<SceneConfig>) {
    this.scene.update(s => ({ ...s, ...partial }));
  }

  updateSphere(index: number, partial: Partial<SphereConfig>) {
    this.scene.update(s => {
      const spheres = s.spheres.map((sp, i) => i === index ? { ...sp, ...partial } : sp);
      return { ...s, spheres };
    });
  }

  addSphere() {
    this.scene.update(s => ({
      ...s,
      spheres: [...s.spheres, { name: `Sphere ${s.spheres.length + 1}`, cx: 800, cy: 400, cz: 300, radius: 100, r: 1, g: 1, b: 1 }],
    }));
  }

  removeSphere(index: number) {
    this.scene.update(s => ({
      ...s,
      spheres: s.spheres.filter((_, i) => i !== index),
    }));
  }

  updateLight(index: number, partial: Partial<LightConfig>) {
    this.scene.update(s => {
      const lights = s.lights.map((l, i) => i === index ? { ...l, ...partial } : l);
      return { ...s, lights };
    });
  }

  addLight() {
    this.scene.update(s => ({
      ...s,
      lights: [...s.lights, { name: `Light ${s.lights.length + 1}`, x: 400, y: 400, z: -200, r: 1, g: 1, b: 1 }],
    }));
  }

  removeLight(index: number) {
    this.scene.update(s => ({
      ...s,
      lights: s.lights.filter((_, i) => i !== index),
    }));
  }

  public buildSphereData(spheres: SphereConfig[]): Float32Array {
    const data = new Float32Array(spheres.length * 7);
    for (let i = 0; i < spheres.length; i++) {
      const s = spheres[i];
      const o = i * 7;
      data[o] = s.cx; data[o + 1] = s.cy; data[o + 2] = s.cz;
      data[o + 3] = s.radius;
      data[o + 4] = s.r; data[o + 5] = s.g; data[o + 6] = s.b;
    }
    return data;
  }

  public buildLightData(lights: LightConfig[]): Float32Array {
    const data = new Float32Array(lights.length * 6);
    for (let i = 0; i < lights.length; i++) {
      const l = lights[i];
      const o = i * 6;
      data[o] = l.x; data[o + 1] = l.y; data[o + 2] = l.z;
      data[o + 3] = l.r; data[o + 4] = l.g; data[o + 5] = l.b;
    }
    return data;
  }
}
