use crate::scene::light::Light;
use crate::scene::sphere::Sphere;
use crate::util::{color::Color, ray::Ray, vector::Vec3};

pub fn get_pixel(
    point: &Vec3,
    spheres: &[Sphere],
    lights: &[Light],
    ambient_intensity: f32,
) -> Color {
    let mut color = Color::new(0.0, 0.0, 0.0);
    let ray = Ray::new(*point, Vec3::new(0.0, 0.0, 1.0));
    let mut lambda = f32::INFINITY;

    for sphere in spheres {
        if let Some(hit) = sphere.get_hit(&ray) {
            if hit.lambda < lambda {
                lambda = hit.lambda;
                color = sphere.color * ambient_intensity;
                for light in lights {
                    color += light.get_color(hit);
                }
            }
        }
    }

    color
}
