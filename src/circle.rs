use crate::{color::Color, vector::Vec2};

#[derive(Debug, Clone, Copy)]
pub struct Circle {
    pub center: Vec2,
    pub radius: f32,
    pub color: Color,
}

impl Circle {
    pub fn new(center: Vec2, radius: f32, color: Color) -> Self {
        Self {
            center,
            radius,
            color,
        }
    }

    pub fn contains(&self, point: Vec2) -> bool {
        point.distance2(&self.center) <= self.radius * self.radius
    }
}
