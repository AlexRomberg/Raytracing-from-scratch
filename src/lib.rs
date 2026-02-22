mod utils;

use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, ImageData};

#[wasm_bindgen]
pub fn render(canvas: HtmlCanvasElement) -> Result<(), JsValue> {
    let width = canvas.width() as usize;
    let height = canvas.height() as usize;

    let ctx = canvas
        .get_context("2d")?
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()?;

    // RGBA buffer – 4 bytes per pixel
    let mut pixels = vec![0u8; width * height * 4];

    for y in 0..height {
        for x in 0..width {
            let offset = (y * width + x) * 4;

            // --- replace this with your ray-tracing logic ---
            let r = ((x as f64 / width as f64) * 255.0) as u8;
            let g = ((y as f64 / height as f64) * 255.0) as u8;
            let b = 128u8;
            let a = 255u8;
            // ------------------------------------------------

            pixels[offset] = r;
            pixels[offset + 1] = g;
            pixels[offset + 2] = b;
            pixels[offset + 3] = a;
        }
    }

    let image_data = ImageData::new_with_u8_clamped_array_and_sh(
        wasm_bindgen::Clamped(&pixels),
        width as u32,
        height as u32,
    )?;
    ctx.put_image_data(&image_data, 0.0, 0.0)?;

    Ok(())
}
