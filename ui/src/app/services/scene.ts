import { Injectable, signal } from '@angular/core';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface SphereConfig {
  name: string;
  center: Vec3;
  radius: number;
  color: Color;
}

export interface LightConfig {
  name: string;
  center: Vec3;
  color: Color;
}

export interface TriangleConfig {
  name: string;
  pointA: Vec3;
  pointB: Vec3;
  pointC: Vec3;
  color: Color;
}

export interface SceneConfig {
  diffuseIntensity: number;
  spheres: SphereConfig[];
  triangles: TriangleConfig[];
  lights: LightConfig[];
}

const DEFAULT_SCENE: SceneConfig = {
  diffuseIntensity: 0.1,
  spheres: [
    { name: 'Ball top', center: { x: 550, y: 450, z: 800 }, radius: 120, color: { r: 0.2, g: 0.7, b: 0.9 } },
  ],
  triangles: [
    { name: 'cube', pointA: { x: 230, y: 400, z: 420 }, pointB: { x: 320, y: 400, z: 360 }, pointC: { x: 400, y: 520, z: 420 }, color: { r: 0.92, g: 0.31, b: 0.28 } },
    { name: 'cube', pointA: { x: 230, y: 400, z: 420 }, pointB: { x: 400, y: 520, z: 420 }, pointC: { x: 310, y: 520, z: 480 }, color: { r: 0.34, g: 0.13, b: 0.47 } },
    { name: 'cube', pointA: { x: 260, y: 430, z: 560 }, pointB: { x: 350, y: 430, z: 500 }, pointC: { x: 430, y: 550, z: 560 }, color: { r: 0.75, g: 0.22, b: 0.63 } },
    { name: 'cube', pointA: { x: 260, y: 430, z: 560 }, pointB: { x: 430, y: 550, z: 560 }, pointC: { x: 340, y: 550, z: 620 }, color: { r: 0.26, g: 0.66, b: 0.91 } },
    { name: 'cube', pointA: { x: 260, y: 430, z: 560 }, pointB: { x: 230, y: 400, z: 420 }, pointC: { x: 340, y: 550, z: 620 }, color: { r: 0.87, g: 0.54, b: 0.19 } },
    { name: 'cube', pointA: { x: 230, y: 400, z: 420 }, pointB: { x: 340, y: 550, z: 620 }, pointC: { x: 310, y: 520, z: 480 }, color: { r: 0.57, g: 0.34, b: 0.78 } },
    { name: 'cube', pointA: { x: 320, y: 400, z: 360 }, pointB: { x: 350, y: 430, z: 500 }, pointC: { x: 430, y: 550, z: 560 }, color: { r: 0.21, g: 0.92, b: 0.71 } },
    { name: 'cube', pointA: { x: 320, y: 400, z: 360 }, pointB: { x: 430, y: 550, z: 560 }, pointC: { x: 400, y: 520, z: 420 }, color: { r: 0.93, g: 0.49, b: 0.37 } },
    { name: 'cube', pointA: { x: 230, y: 400, z: 420 }, pointB: { x: 260, y: 430, z: 560 }, pointC: { x: 350, y: 430, z: 500 }, color: { r: 0.46, g: 0.82, b: 0.28 } },
    { name: 'cube', pointA: { x: 230, y: 400, z: 420 }, pointB: { x: 350, y: 430, z: 500 }, pointC: { x: 320, y: 400, z: 360 }, color: { r: 0.69, g: 0.26, b: 0.57 } },
    { name: 'cube', pointA: { x: 310, y: 520, z: 480 }, pointB: { x: 400, y: 520, z: 420 }, pointC: { x: 430, y: 550, z: 560 }, color: { r: 0.32, g: 0.74, b: 0.86 } },
    { name: 'cube', pointA: { x: 310, y: 520, z: 480 }, pointB: { x: 430, y: 550, z: 560 }, pointC: { x: 340, y: 550, z: 620 }, color: { r: 0.78, g: 0.53, b: 0.15 } },
  ],
  lights: [
    { name: 'Main light', center: { x: 100, y: 700, z: 100 }, color: { r: 1, g: 1, b: 1 } },
    { name: 'Main light', center: { x: 300, y: 800, z: 150 }, color: { r: 1, g: 1, b: 1 } },
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
      spheres: [...s.spheres, { name: `Sphere ${s.spheres.length + 1}`, center: { x: 800, y: 400, z: 300 }, radius: 100, color: { r: 1, g: 1, b: 1 } }],
    }));
  }

  removeSphere(index: number) {
    this.scene.update(s => ({
      ...s,
      spheres: s.spheres.filter((_, i) => i !== index),
    }));
  }

  updateTriangle(index: number, partial: Partial<TriangleConfig>) {
    this.scene.update(s => {
      const triangles = s.triangles.map((t, i) => i === index ? { ...t, ...partial } : t);
      return { ...s, triangles };
    });
  }

  addTriangle() {
    this.scene.update(s => ({
      ...s,
      triangles: [...s.triangles, { name: `Triangle ${s.triangles.length + 1}`, pointA: { x: 700, y: 400, z: 200 }, pointB: { x: 900, y: 400, z: 200 }, pointC: { x: 800, y: 400, z: 400 }, color: { r: 1, g: 1, b: 1 } }],
    }));
  }

  removeTriangle(index: number) {
    this.scene.update(s => ({
      ...s,
      triangles: s.triangles.filter((_, i) => i !== index),
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
      lights: [...s.lights, { name: `Light ${s.lights.length + 1}`, center: { x: 400, y: 400, z: -200 }, color: { r: 1, g: 1, b: 1 } }],
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
      data[o] = s.center.x; data[o + 1] = s.center.y; data[o + 2] = -s.center.z;
      data[o + 3] = s.radius;
      data[o + 4] = s.color.r; data[o + 5] = s.color.g; data[o + 6] = s.color.b;
    }
    return data;
  }

  buildTriangleData(triangles: TriangleConfig[]): Float32Array {
    const data = new Float32Array(triangles.length * 12);
    for (let i = 0; i < triangles.length; i++) {
      const t = triangles[i];
      const o = i * 12;
      data[o] = t.pointA.x; data[o + 1] = t.pointA.y; data[o + 2] = -t.pointA.z;
      data[o + 3] = t.pointB.x; data[o + 4] = t.pointB.y; data[o + 5] = -t.pointB.z;
      data[o + 6] = t.pointC.x; data[o + 7] = t.pointC.y; data[o + 8] = -t.pointC.z;
      data[o + 9] = t.color.r; data[o + 10] = t.color.g; data[o + 11] = t.color.b;
    }
    return data;
  }

  public buildLightData(lights: LightConfig[]): Float32Array {
    const data = new Float32Array(lights.length * 6);
    for (let i = 0; i < lights.length; i++) {
      const l = lights[i];
      const o = i * 6;
      data[o] = l.center.x; data[o + 1] = l.center.y; data[o + 2] = -l.center.z;
      data[o + 3] = l.color.r; data[o + 4] = l.color.g; data[o + 5] = l.color.b;
    }
    return data;
  }
}
