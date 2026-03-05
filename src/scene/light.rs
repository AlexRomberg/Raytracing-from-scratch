use crate::util::{color::Color, hit::Hit, ray::Ray, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Light {
    pub position: Vec3,
    pub color: Color,
}

impl Light {
    pub fn new(position: Vec3, color: Color) -> Self {
        Self { position, color }
    }

    pub fn get_color(&self, ray: &Ray, hit: Hit) -> Color {
        let point = ray.origin + ray.direction * hit.lambda;
        let normal = hit.normal;
        let light_dir = (self.position - point).normalized();
        let intensity = normal.dot(&light_dir).max(0.0);
        self.color * intensity * hit.color
    }
}

pub fn get_diffuse_light_color(color: Color) -> Color {
    color * 0.1
}
