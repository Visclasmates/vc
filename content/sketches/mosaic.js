let imageCells;
let pg;
let mosaic;
let video_src;
let debug;
let cols;
// ui
let resolution;
let sel;
let video_on;
let p;
let image_src;
const SAMPLE_RES = 500;
let pal;

function preload() {
  video_src = createVideo(['/vc/sketches/mandrill.webm']);
  video_src.hide(); // by default video shows up in separate dom
  mosaic = readShader('/vc/sketches/photomosaic.frag');
  image_src = loadImage('/vc/sketches/mandrill.png');
  p = [];
  for (let i = 1; i <= 30; i++) {
    p.push(loadImage(`/vc/sketches/shaders/mandrilles/${i}.jpg`));
  }
  input = createFileInput(handleFile);
  input.position(10, 30);
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(p);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('luma', false);
  mosaic.setUniform('source', image_src);
  resolution = createSlider(1, 150, 50, 1);
  resolution.position(20, 550);
  resolution.style('width', '80px');
  resolution.input(() => { mosaic.setUniform('resolution', resolution.value()) });
  mosaic.setUniform('resolution', resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  mosaic.setUniform('cols', imageCells.width);
  mododesort();
}

function mododesort() {
  drawQuadrille(imageCells, { graphics: pg, cellLength: SAMPLE_RES, outlineWeight: 0 });
  mosaic.setUniform('palette', pg);
}

function draw() {
  cover({ texture: true });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}