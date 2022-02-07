let texture_shader;
let img;
// ui
let enable_shader;
let opacity;

function preload() {
  // readShader: https://github.com/VisualComputing/p5.shaderbox#readshader
  texture_shader = readShader('/vc/sketches/texture.frag');
  img = loadImage('/vc/sketches/mandrill.png');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  textureMode(NORMAL);
  opacity = createSlider(0, 255, 125, 1);
  opacity.position(10, 25);
  opacity.style('width', '580px');
  opacity.hide();
  enable_shader = createCheckbox('enable shader', false);
  enable_shader.style('color', 'magenta');
  enable_shader.changed(() => {
    if (enable_shader.checked()) {
      opacity.show();
      shader(texture_shader);
      texture_shader.setUniform('texture', img);
    } else {
      opacity.hide();
      resetShader();
    }
  });
  enable_shader.position(10, 10);
}

function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  orbitControl();
  push();
  fill(color('red'));
  rect(30, 15, 55, 55);
  pop();
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  box(30, 50);
  if (enable_shader.checked()) {
    // use custom texturing shader
    shader(texture_shader);
    // renders the rectangular area on top of the 3D scene
    cover({ texture: true, x: -width / 2, y: -height / 2,
            w: width / 2, h: height / 2,
            pattern0: color(255, 255, 255, opacity.value()) });
    cover({ texture: true, x: -width / 2, y: 0,
            w: width / 2, h: height / 2,
            pattern0: color(255, 255, 255, opacity.value()),
            pattern1: color(255, 0, 0, opacity.value()) });
    cover({ texture: true, x: 0, y: -height / 2,
            w: width / 2, h: height / 2,
            pattern0: color(255, 255, 255, opacity.value()),
            pattern1: color(255, 0, 0, opacity.value()),
            pattern2: color(0, 255, 0, opacity.value()) });
    cover({ texture: true, x: 0, y: 0,
            w: width / 2, h: height / 2,
            pattern0: color(255, 255, 255, opacity.value()),
            pattern1: color(0, 255, 0, opacity.value()),
            pattern2: color(0, 255, 0, opacity.value()),
            pattern3: color(0, 0, 255, opacity.value()) });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}