use crate::util::{color::Color, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Light {
    pub position: Vec3,
    pub color: Color,
}

impl Light {
    pub fn new(position: Vec3, color: Color) -> Self {
        Self { position, color }
    }
}
