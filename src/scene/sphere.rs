use crate::util::{color::Color, ray::Ray, vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Sphere {
    pub center: Vec3,
    pub radius: f32,
    pub color: Color,
}

impl Sphere {
    pub fn get_lambda(&self, ray: &Ray) -> Option<f32> {
        let v = ray.origin - self.center;
        let u = ray.direction;
        let a = u.dot(&u);
        let b = 2.0 * v.dot(&u);
        let c = v.dot(&v) - self.radius * self.radius;
        let root_content = b * b - 4.0 * a * c;
        if root_content < 0.0 {
            return None;
        }
        Some((-b - (root_content).sqrt()) / (2.0 * a))
    }
}
