mod scene;
mod util;

use wasm_bindgen::prelude::*;

use scene::scene::get_pixel;

use crate::util::vector::Vec3;

#[wasm_bindgen]
pub fn render_rows(width: u32, start_row: u32, end_row: u32) -> Vec<u8> {
    let row_count = end_row - start_row;
    let mut pixels = Vec::with_capacity((row_count * width * 4) as usize);
    let alpha = 0xffu8;

    for y in start_row..end_row {
        for x in 0..width {
            let point = Vec3::new(x as f32, y as f32, 0.0);
            let color = get_pixel(&point);
            pixels.push((color.r * 255.0) as u8);
            pixels.push((color.g * 255.0) as u8);
            pixels.push((color.b * 255.0) as u8);
            pixels.push(alpha);
        }
    }

    pixels
}
