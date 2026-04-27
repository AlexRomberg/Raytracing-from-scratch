use crate::{scene::material::Material, util::vector::Vec3};

#[derive(Debug, Clone, Copy)]
pub struct Hit {
    pub point: Vec3,
    pub normal: Vec3,
    pub lambda: f32,
    pub material: Material,
    pub offset_x: Option<f32>,
    pub offset_y: Option<f32>,
}

impl Hit {
    pub fn new(
        point: Vec3,
        normal: Vec3,
        lambda: f32,
        material: Material,
        offset_x: Option<f32>,
        offset_y: Option<f32>,
    ) -> Self {
        Self {
            point,
            normal,
            lambda,
            material,
            offset_x,
            offset_y,
        }
    }
}
