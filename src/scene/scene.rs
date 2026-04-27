use crate::scene::light::Light;
use crate::scene::sphere::Sphere;
use crate::scene::triangle::Triangle;
use crate::util::camera::Camera;
use crate::util::hit::Hit;
use crate::util::ray;
use crate::util::{color::Color, ray::Ray};

pub fn get_pixel(
    x: f32,
    y: f32,
    width: f32,
    height: f32,
    spheres: &[Sphere],
    triangles: &[Triangle],
    lights: &[Light],
    camera: &Camera,
) -> Color {
    let mut color = Color::new(0.0, 0.0, 0.0);
    let ray = camera.get_ray(x, y, width, height);

    let nearest_hit = get_hit(spheres, triangles, ray);

    if nearest_hit.is_none() {
        return color;
    }
    let hit = nearest_hit.unwrap();

    color = hit.material.ambient_term();
    let view_dir = (-ray.direction).normalized();

    for light in lights {
        let to_light = light.position - hit.point;
        let light_dir = to_light.normalized();
        let correction_shift = light_dir * 0.0005;
        let distance_to_light_2 = to_light.length2();
        let ray_to_light = ray::Ray::new(hit.point + correction_shift, light_dir);
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
            color += hit
                .material
                .shade_blinn_phong(light, hit.normal, light_dir, view_dir);
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
