use crate::{color::Color, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Sphere {
    pub center: Vec3,
    pub radius: f32,
    pub color: Color,
}

impl Sphere {
    pub fn new(center: Vec3, radius: f32, color: Color) -> Self {
        Self {
            center,
            radius,
            color,
        }
    }

    pub fn contains(&self, point: &Vec3) -> bool {
        point.distance2(&self.center) <= self.radius * self.radius
    }
}
