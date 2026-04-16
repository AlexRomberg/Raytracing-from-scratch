@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -3.0),
    vec2f(-1.0, 1.0),
    vec2f(3.0, 1.0)
  );
  let pos = positions[vertexIndex];
  return vec4f(pos, 0.0, 1.0);
}

fn get_color(x: f32, y: f32) -> vec3f {
  let checker = (u32(x / 10.0) + u32(y / 10.0)) % 2u;
  if (checker == 0u) {
    return vec3f(0.00, 1.0, 1.0);
  }
  return vec3f(1.0, 1.0, 0.0);
}

@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  return vec4f(get_color(fragCoord.x, fragCoord.y), 1.0);
}
