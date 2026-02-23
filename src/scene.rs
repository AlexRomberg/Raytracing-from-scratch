use crate::vector::Vec2;

pub struct Circle {
    pub center: Vec2,
    pub radius: i32,
}

pub fn circles() -> Vec<Circle> {
    vec![
        Circle {
            center: Vec2::new(200, 200),
            radius: 80,
        },
        Circle {
            center: Vec2::new(400, 300),
            radius: 120,
        },
        Circle {
            center: Vec2::new(600, 250),
            radius: 60,
        },
        Circle {
            center: Vec2::new(600, 600),
            radius: 30,
        },
        Circle {
            center: Vec2::new(1200, 90),
            radius: 60,
        },
        Circle {
            center: Vec2::new(1300, 800),
            radius: 60,
        },
    ]
}

pub fn get_pixel(x: usize, y: usize, width: usize, height: usize) -> (u8, u8, u8) {
    let point = {
        let x = x as i32;
        let y = y as i32;
        Vec2 { x, y }
    };

    for circle in &circles() {
        if point.distance2(&circle.center) <= circle.radius * circle.radius {
            return (0x00, 0x7a, 0xff);
        }
    }

    let r = 0u8;
    let g = 0u8;
    let b = 0u8;
    (r, g, b)
}
