use std::ops::Mul;

use crate::util::vector::Vec3;

pub struct Matrix3x3 {
    pub matrix: [f32; 9],
}

impl Matrix3x3 {
    pub fn from_vectors(vectors: [Vec3; 3]) -> Self {
        Self {
            matrix: [
                vectors[0].x,
                vectors[1].x,
                vectors[2].x,
                vectors[0].y,
                vectors[1].y,
                vectors[2].y,
                vectors[0].z,
                vectors[1].z,
                vectors[2].z,
            ],
        }
    }

    pub fn determinant(&self) -> f32 {
        let m = &self.matrix;
        m[0] * (m[4] * m[8] - m[5] * m[7]) - m[1] * (m[3] * m[8] - m[5] * m[6])
            + m[2] * (m[3] * m[7] - m[4] * m[6])
    }

    pub fn inverse(&self) -> Self {
        let m = &self.matrix;
        let det = self.determinant();
        if det == 0.0 {
            panic!("Matrix is singular and cannot be inverted");
        }
        let inv_det = 1.0 / det;
        Self {
            matrix: [
                (m[4] * m[8] - m[5] * m[7]) * inv_det,
                (m[2] * m[7] - m[1] * m[8]) * inv_det,
                (m[1] * m[5] - m[2] * m[4]) * inv_det,
                (m[5] * m[6] - m[3] * m[8]) * inv_det,
                (m[0] * m[8] - m[2] * m[6]) * inv_det,
                (m[2] * m[3] - m[0] * m[5]) * inv_det,
                (m[3] * m[7] - m[4] * m[6]) * inv_det,
                (m[1] * m[6] - m[0] * m[7]) * inv_det,
                (m[0] * m[4] - m[1] * m[3]) * inv_det,
            ],
        }
    }
}

impl Mul<Vec3> for Matrix3x3 {
    type Output = Vec3;

    fn mul(self, rhs: Vec3) -> Vec3 {
        let m = &self.matrix;
        Vec3 {
            x: m[0] * rhs.x + m[1] * rhs.y + m[2] * rhs.z,
            y: m[3] * rhs.x + m[4] * rhs.y + m[5] * rhs.z,
            z: m[6] * rhs.x + m[7] * rhs.y + m[8] * rhs.z,
        }
    }
}
