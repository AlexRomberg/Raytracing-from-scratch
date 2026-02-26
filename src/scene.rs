use crate::circle::Circle;
use crate::color::Color;
use crate::vector::Vec2;

pub fn circles() -> Vec<Circle> {
    vec![
        Circle {
            center: Vec2::new(600.0, 300.0),
            radius: 150.0,
            color: Color::new(1.0, 0.0, 0.0),
        },
        Circle {
            center: Vec2::new(500.0, 500.0),
            radius: 150.0,
            color: Color::new(0.0, 1.0, 0.0),
        },
        Circle {
            center: Vec2::new(700.0, 500.0),
            radius: 150.0,
            color: Color::new(0.0, 0.0, 1.0),
        },
    ]
}

pub fn get_pixel(point: Vec2) -> Color {
    let mut color = Color::new(1.0, 1.0, 1.0);

    for circle in &circles() {
        if circle.contains(point) {
            color = color + circle.color;
        }
    }

    color
}
