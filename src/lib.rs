mod color;
mod scene;
mod sphere;
mod util;

use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, ImageData};

use scene::get_pixel;

use crate::util::vector::Vec3;

#[wasm_bindgen]
pub fn render(canvas: HtmlCanvasElement) -> Result<(), JsValue> {
    let width = canvas.width();
    let height = canvas.height();

    let ctx = canvas
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;

    let mut pixels = vec![0u8; (width * height * 4) as usize];
    let alpha = 0xffu8;

    for y in 0..height {
        for x in 0..width {
            let point = Vec3::new(x as f32, y as f32, 0.0);
            let color = get_pixel(&point);
            let offset = ((y * width + x) * 4) as usize;
            pixels[offset] = (color.r * 255.0) as u8;
            pixels[offset + 1] = (color.g * 255.0) as u8;
            pixels[offset + 2] = (color.b * 255.0) as u8;
            pixels[offset + 3] = alpha;
        }
    }

    let image_data =
        ImageData::new_with_u8_clamped_array_and_sh(wasm_bindgen::Clamped(&pixels), width, height)?;
    ctx.put_image_data(&image_data, 0.0, 0.0)?;

    Ok(())
}
