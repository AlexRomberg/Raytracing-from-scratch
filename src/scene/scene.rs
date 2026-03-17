use crate::scene::light::Light;
use crate::scene::sphere::Sphere;
use crate::scene::triangle::Triangle;
use crate::util::hit::Hit;
use crate::util::{color::Color, ray::Ray, vector::Vec3};

pub fn get_pixel(
    point: &Vec3,
    spheres: &[Sphere],
    triangles: &[Triangle],
    lights: &[Light],
    ambient_intensity: f32,
) -> Color {
    let mut color = Color::new(0.0, 0.0, 0.0);
    let ray = Ray::new(*point, Vec3::new(0.0, 0.0, 1.0));
    let mut lambda = f32::INFINITY;
    let mut nearest_hit: Option<Hit> = None;

    for sphere in spheres {
        if let Some(hit) = sphere.get_hit(&ray) {
            if hit.lambda < lambda {
                lambda = hit.lambda;
                nearest_hit = Some(hit);
            }
        }
    }

    for triangle in triangles {
        if let Some(hit) = triangle.get_hit(&ray) {
            if hit.lambda < lambda {
                lambda = hit.lambda;
                nearest_hit = Some(hit);
            }
        }
    }

    if let Some(hit) = nearest_hit {
        color = hit.color * ambient_intensity;
        for light in lights {
            color += light.get_color(hit);
        }
    }

    color
}
