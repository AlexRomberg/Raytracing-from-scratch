use wasm_bindgen::prelude::wasm_bindgen;

use crate::util::{ray::Ray, vector::Vec3};

#[allow(dead_code)]
#[derive(Debug, Clone, Copy)]
pub struct Camera {
    position: Vec3,
    target: Vec3,
    world_up: Vec3,
    fov: f32,
    half_width: f32,
    half_height: f32,
    forward: Vec3,
    right: Vec3,
    up: Vec3,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

impl Camera {
    pub fn new(position: Vec3, target: Vec3, world_up: Vec3, fov: f32, aspect_ratio: f32) -> Self {
        let forward = (target - position).normalized();
        let right = forward.cross(&world_up).normalized();
        let up = right.cross(&forward).normalized();

        let half_width: f32 = (fov.to_radians() / 2.0).tan();
        let half_height: f32 = half_width / aspect_ratio;

        Self {
            position,
            target,
            world_up,
            fov,
            half_width,
            half_height,
            forward,
            right,
            up,
        }
    }

    pub fn get_ray(&self, x: f32, y: f32, width: f32, height: f32) -> Ray {
        if false {
            return Ray::new(
                Vec3 {
                    x: x - 100.0,
                    y: y - 100.0,
                    z: 0.0,
                },
                self.forward,
            );
        }

        let u = 2.0 * (x + 0.5) / width - 1.0;
        let v = 1.0 - 2.0 * (y + 0.5) / height;

        let mut ray_direction = self.forward
            + (self.right * (u * self.half_width))
            + (self.up * (v * self.half_height));
        ray_direction.y = -ray_direction.y;

        Ray::new(self.position, ray_direction.normalized())
    }
}
