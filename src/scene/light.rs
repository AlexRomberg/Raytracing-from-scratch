use crate::util::{color::Color, hit::Hit, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Light {
    pub position: Vec3,
    pub color: Color,
}

impl Light {
    pub fn new(position: Vec3, color: Color) -> Self {
        Self { position, color }
    }

    pub fn get_color(&self, hit: Hit) -> Color {
        let s = (self.position - hit.point).normalized();
        hit.color * self.color * s.dot(&hit.normal).max(0.0)
    }
}
