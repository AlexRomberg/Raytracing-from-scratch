mod scene;
mod util;

use wasm_bindgen::prelude::*;

use scene::light::Light;
use scene::scene::get_pixel;
use scene::sphere::Sphere;

use crate::util::color::Color;
use crate::util::vector::Vec3;

fn parse_spheres(data: &[f32]) -> Vec<Sphere> {
    data.chunks_exact(7)
        .map(|c| Sphere {
            center: Vec3::new(c[0], c[1], c[2]),
            radius: c[3],
            color: Color::new(c[4], c[5], c[6]),
        })
        .collect()
}

fn parse_lights(data: &[f32]) -> Vec<Light> {
    data.chunks_exact(6)
        .map(|c| Light::new(Vec3::new(c[0], c[1], c[2]), Color::new(c[3], c[4], c[5])))
        .collect()
}

#[wasm_bindgen]
pub fn render_rows(
    width: u32,
    start_row: u32,
    end_row: u32,
    sphere_data: &[f32],
    light_data: &[f32],
    diffuse_intensity: f32,
) -> Vec<u8> {
    let spheres = parse_spheres(sphere_data);
    let lights = parse_lights(light_data);
    let row_count = end_row - start_row;
    let mut pixels = Vec::with_capacity((row_count * width * 4) as usize);
    let alpha = 0xffu8;

    for y in start_row..end_row {
        for x in 0..width {
            let point = Vec3::new(x as f32, y as f32, 0.0);
            let color = get_pixel(&point, &spheres, &lights, diffuse_intensity);
            pixels.push((color.r * 255.0) as u8);
            pixels.push((color.g * 255.0) as u8);
            pixels.push((color.b * 255.0) as u8);
            pixels.push(alpha);
        }
    }

    pixels
}
