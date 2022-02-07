let image_src;
let video_src;
let mosaic;
let resolution;
let video_on;
let input;
let img;

/*function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
    console.log(img.value());
  } else {
    img = null;
  }
  image_src=loadImage(file.data);
  mosaic.setUniform('img', image_src);
}*/
function preload() {
  image_src = loadImage('/vc/sketches/canela.png');
  mosaic = readShader('/vc/sketches/pixel.frag');
  input = createFileInput(handleFile);
  input.position(10, 30);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  mosaic.setUniform('img', image_src);
  resolution = createSlider(1, 500, 50, 1);
  resolution.position(20, 550);
  resolution.style('width', '80px');
  resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
  console.log(resolution.value());
  mosaic.setUniform('resolution', resolution.value());
}
function draw() {
  background(33);
  cover({ texture: true });
}