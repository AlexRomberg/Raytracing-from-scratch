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
  shininess: number;
  diffuse: number;
  specular: number;
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
  shininess: number;
  diffuse: number;
  specular: number;
}

const DEFAULT_SHININESS = 32;
const DEFAULT_DIFFUSE = 1;
const DEFAULT_SPECULAR = 0.7;

export interface SceneConfig {
  diffuseIntensity: number;
  spheres: SphereConfig[];
  triangles: TriangleConfig[];
  lights: LightConfig[];
}

const POINT_FBL: Vec3 = { x: -500, y: -500, z: 0 };
const POINT_FBR: Vec3 = { x: 500, y: -500, z: 0 };
const POINT_FTL: Vec3 = { x: -500, y: 500, z: 0 };
const POINT_FTR: Vec3 = { x: 500, y: 500, z: 0 };
const POINT_BBL: Vec3 = { x: -501, y: -500, z: 1000 };
const POINT_BBR: Vec3 = { x: 501, y: -500, z: 1000 };
const POINT_BTL: Vec3 = { x: -501, y: 500, z: 1000 };
const POINT_BTR: Vec3 = { x: 501, y: 500, z: 1000 };

const DEFAULT_SCENE: SceneConfig = {
  diffuseIntensity: 0.1,
  spheres: [
    {
      name: 'Ball',
      center: { x: -100, y: -100, z: 600 },
      radius: 120,
      color: { r: 0.2, g: 0.7, b: 0.9 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },

    {
      name: 'Back Bottom Left',
      center: POINT_BBL,
      radius: 10,
      color: { r: 0, g: 0, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Back Bottom Right',
      center: POINT_BBR,
      radius: 10,
      color: { r: 0, g: 0, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Back Top Left',
      center: POINT_BTL,
      radius: 10,
      color: { r: 0, g: 0, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Back Top Right',
      center: POINT_BTR,
      radius: 10,
      color: { r: 0, g: 0, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },

    {
      name: 'Front Bottom Left',
      center: POINT_FBL,
      radius: 10,
      color: { r: 1, g: 0, b: 0 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Front Bottom Right',
      center: POINT_FBR,
      radius: 10,
      color: { r: 1, g: 0, b: 0 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Front Top Left',
      center: POINT_FTL,
      radius: 10,
      color: { r: 1, g: 0, b: 0 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'Front Top Right',
      center: POINT_FTR,
      radius: 10,
      color: { r: 1, g: 0, b: 0 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
  ],
  triangles: [
    {
      name: 'L',
      pointA: POINT_FTL,
      pointB: POINT_FBL,
      pointC: POINT_BBL,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'L',
      pointA: POINT_FTL,
      pointB: POINT_BBL,
      pointC: POINT_BTL,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'R',
      pointA: POINT_FBR,
      pointB: POINT_FTR,
      pointC: POINT_BBR,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'R',
      pointA: POINT_BBR,
      pointB: POINT_FTR,
      pointC: POINT_BTR,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'B',
      pointA: POINT_FBL,
      pointB: POINT_FBR,
      pointC: POINT_BBR,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'B',
      pointA: POINT_FBL,
      pointB: POINT_BBR,
      pointC: POINT_BBL,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'T',
      pointA: POINT_FTR,
      pointB: POINT_FTL,
      pointC: POINT_BTR,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'T',
      pointA: POINT_BTR,
      pointB: POINT_FTL,
      pointC: POINT_BTL,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'BACK',
      pointA: POINT_BTR,
      pointB: POINT_BBL,
      pointC: POINT_BBR,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
    {
      name: 'BACK',
      pointA: POINT_BTR,
      pointB: POINT_BTL,
      pointC: POINT_BBL,
      color: { r: 1, g: 1, b: 1 },
      shininess: DEFAULT_SHININESS,
      diffuse: DEFAULT_DIFFUSE,
      specular: DEFAULT_SPECULAR,
    },
  ],
  lights: [
    { name: 'Main light', center: { x: 0, y: 0, z: 350 }, color: { r: 1, g: 1, b: 1 } },
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
      spheres: [
        ...s.spheres,
        {
          name: `Sphere ${s.spheres.length + 1}`,
          center: { x: 800, y: 400, z: 300 },
          radius: 100,
          color: { r: 1, g: 1, b: 1 },
          shininess: DEFAULT_SHININESS,
          diffuse: DEFAULT_DIFFUSE,
          specular: DEFAULT_SPECULAR,
        },
      ],
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
      triangles: [
        ...s.triangles,
        {
          name: `Triangle ${s.triangles.length + 1}`,
          pointA: { x: 700, y: 400, z: 200 },
          pointB: { x: 900, y: 400, z: 200 },
          pointC: { x: 800, y: 400, z: 400 },
          color: { r: 1, g: 1, b: 1 },
          shininess: DEFAULT_SHININESS,
          diffuse: DEFAULT_DIFFUSE,
          specular: DEFAULT_SPECULAR,
        },
      ],
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
    const data = new Float32Array(spheres.length * 10);
    for (let i = 0; i < spheres.length; i++) {
      const s = spheres[i];
      const o = i * 10;
      data[o] = s.center.x; data[o + 1] = s.center.y; data[o + 2] = -s.center.z;
      data[o + 3] = s.radius;
      data[o + 4] = s.color.r; data[o + 5] = s.color.g; data[o + 6] = s.color.b;
      data[o + 7] = s.shininess;
      data[o + 8] = s.diffuse;
      data[o + 9] = s.specular;
    }
    return data;
  }

  buildTriangleData(triangles: TriangleConfig[]): Float32Array {
    const data = new Float32Array(triangles.length * 15);
    for (let i = 0; i < triangles.length; i++) {
      const t = triangles[i];
      const o = i * 15;
      data[o] = t.pointA.x; data[o + 1] = t.pointA.y; data[o + 2] = -t.pointA.z;
      data[o + 3] = t.pointB.x; data[o + 4] = t.pointB.y; data[o + 5] = -t.pointB.z;
      data[o + 6] = t.pointC.x; data[o + 7] = t.pointC.y; data[o + 8] = -t.pointC.z;
      data[o + 9] = t.color.r; data[o + 10] = t.color.g; data[o + 11] = t.color.b;
      data[o + 12] = t.shininess;
      data[o + 13] = t.diffuse;
      data[o + 14] = t.specular;
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
