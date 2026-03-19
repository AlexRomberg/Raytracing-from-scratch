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
    { name: 'Lime Left', center: { x: 650, y: 250, z: 1050 }, radius: 50, color: { r: 0, g: 1, b: 0 } },
  ],
  triangles: [
    { name: 'TRI', pointA: { x: 500, y: 500, z: 500 }, pointB: { x: 600, y: 600, z: 500 }, pointC: { x: 500, y: 600, z: 500 }, color: { r: 1, g: 1, b: 1 } },
    { name: 'TRI', pointA: { x: 500, y: 500, z: 500 }, pointB: { x: 600, y: 600, z: 500 }, pointC: { x: 600, y: 500, z: 500 }, color: { r: 1, g: 1, b: 1 } },
  ],
  lights: [
    { name: 'Main Light', center: { x: 800, y: 300, z: -400 }, color: { r: 1, g: 1, b: 1 } },
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
