use crate::scene::light::Light;
use crate::scene::sphere::Sphere;
use crate::scene::triangle::Triangle;
use crate::util::hit::Hit;
use crate::util::ray;
use crate::util::{color::Color, ray::Ray, vector::Vec3};

pub fn get_pixel(
    point: &Vec3,
    spheres: &[Sphere],
    triangles: &[Triangle],
    lights: &[Light],
    ambient_intensity: f32,
) -> Color {
    let mut color = Color::new(0.0, 0.0, 0.0);
    let ray = Ray::new(*point, Vec3::new(0.0, 0.0, -1.0));
    let nearest_hit = get_hit(spheres, triangles, ray);

    if nearest_hit.is_none() {
        return color;
    }
    let hit = nearest_hit.unwrap();

    color = hit.color * ambient_intensity;
    for light in lights {
        let to_light = light.position - hit.point;
        let correction_shift = to_light.normalized() * 0.0001;
        let distance_to_light_2 = to_light.length2();
        let ray_to_light = ray::Ray::new(hit.point + correction_shift, to_light.normalized());
        let mut in_shadow = false;

        for sphere in spheres {
            if let Some(intersection) = sphere.get_hit(&ray_to_light) {
                if intersection.lambda > 0.0
                    && intersection.lambda * intersection.lambda < distance_to_light_2
                {
                    in_shadow = true;
                    break;
                }
            }
        }

        if !in_shadow {
            for triangle in triangles {
                if let Some(intersection) = triangle.get_hit(&ray_to_light) {
                    if intersection.lambda > 0.0
                        && intersection.lambda * intersection.lambda < distance_to_light_2
                    {
                        in_shadow = true;
                        break;
                    }
                }
            }
        }

        if !in_shadow {
            color += light.get_color(hit);
        }
    }

    color
}

fn get_hit(spheres: &[Sphere], triangles: &[Triangle], ray: Ray) -> Option<Hit> {
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

    return nearest_hit;
}
