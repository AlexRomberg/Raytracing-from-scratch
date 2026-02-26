use crate::color::Color;
use crate::ray::Ray;
use crate::sphere::Sphere;
use crate::vector::Vec3;

pub fn circles() -> Vec<Sphere> {
    vec![
        Sphere {
            center: Vec3::new(600.0, 300.0, 500.0),
            radius: 150.0,
            color: Color::new(1.0, 0.0, 0.0),
        },
        // Circle {
        //     center: Vec3::new(500.0, 500.0, 500.0),
        //     radius: 150.0,
        //     color: Color::new(0.0, 1.0, 0.0),
        // },
        // Circle {
        //     center: Vec3::new(700.0, 500.0, 500.0),
        //     radius: 150.0,
        //     color: Color::new(0.0, 0.0, 1.0),
        // },
    ]
}

pub fn get_pixel(point: &Vec3) -> Color {
    let mut color = Color::new(1.0, 1.0, 1.0);
    let ray = Ray::new(*point, Vec3::new(0.0, 0.0, 1.0));

    for sphere in &circles() {
        if sphere.contains(point) {
            color = color + sphere.color;
        }
    }

    color
}
