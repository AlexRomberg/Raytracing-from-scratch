use crate::util::{color::Color, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Hit {
    pub point: Vec3,
    pub normal: Vec3,
    pub lambda: f32,
    pub color: Color,
}

impl Hit {
    pub fn new(point: Vec3, normal: Vec3, lambda: f32, color: Color) -> Self {
        Self {
            point,
            normal,
            lambda,
            color,
        }
    }
}
