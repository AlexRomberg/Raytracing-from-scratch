mod scene;
mod utils;
pub mod vector;

use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, ImageData};

use scene::get_pixel;

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
            let (r, g, b) = get_pixel(x, y, width, height);
            let offset = ((y * width + x) * 4) as usize;
            pixels[offset] = r;
            pixels[offset + 1] = g;
            pixels[offset + 2] = b;
            pixels[offset + 3] = alpha;
        }
    }

    let image_data =
        ImageData::new_with_u8_clamped_array_and_sh(wasm_bindgen::Clamped(&pixels), width, height)?;
    ctx.put_image_data(&image_data, 0.0, 0.0)?;

    Ok(())
}
