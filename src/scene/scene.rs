use crate::scene::light::{get_diffuse_light_color, Light};
use crate::scene::sphere::Sphere;
use crate::util::{color::Color, ray::Ray, vector::Vec3};

pub fn spheres() -> Vec<Sphere> {
    vec![
        // Blue
        Sphere {
            center: Vec3::new(800.0, 400.0, 400.0),
            radius: 250.0,
            color: Color::new(0.0, 0.0, 1.0),
        },
        // Red
        Sphere {
            center: Vec3::new(800.0, 400.0, 150.0),
            radius: 50.0,
            color: Color::new(1.0, 0.0, 0.0),
        },
        // Light Blue left
        Sphere {
            center: Vec3::new(710.0, 310.0, 330.0),
            radius: 150.0,
            color: Color::new(0.0, 1.0, 1.0),
        },
        // Light Blue right
        Sphere {
            center: Vec3::new(890.0, 310.0, 330.0),
            radius: 150.0,
            color: Color::new(0.0, 1.0, 1.0),
        },
        // Lime left
        Sphere {
            center: Vec3::new(650.0, 250.0, 150.0),
            radius: 50.0,
            color: Color::new(0.0, 1.0, 0.0),
        },
        // Lime right
        Sphere {
            center: Vec3::new(950.0, 250.0, 150.0),
            radius: 50.0,
            color: Color::new(0.0, 1.0, 0.0),
        },
    ]
}

pub fn lights() -> Vec<Light> {
    vec![Light::new(
        Vec3::new(200.0, 100.0, 100.0),
        Color::new(1.0, 1.0, 1.0),
    )]
}

pub fn get_pixel(point: &Vec3) -> Color {
    let mut color = Color::new(0.0, 0.0, 0.0);
    let ray = Ray::new(*point, Vec3::new(0.0, 0.0, 1.0));
    let mut lambda = f32::INFINITY;

    for sphere in &spheres() {
        if let Some(hit) = sphere.get_hit(&ray) {
            if hit.lambda < lambda {
                lambda = hit.lambda;
                color = get_diffuse_light_color(sphere.color);
                for light in &lights() {
                    color += light.get_color(&ray, hit);
                }
            }
        }
    }

    color
}
