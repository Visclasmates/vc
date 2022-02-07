let uvShader;

function preload() {
  // a shader is composed of two parts, a vertex shader and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload, it first
  // takes the filename of a vertex shader, and then a fragment shader
  // these file types are usually .vert and .frag, but anything will do.
  uvShader = loadShader('/vc/sketches/shaders/shader.vert','/vc/sketches/uv.frag');
  console.log(uvShader);
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  // Both default projections work just as well
  // If none is provided perspective is used
  //let eyeZ = (height/2.0) / tan(PI*60.0/360.0);
  //perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
  //ortho(-width/2, width/2, -height/2, height/2);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}

function draw() {
  background(0);
  cover(true);
}

function cover(texture = false) {
  beginShape();
  vertex(-width / 2, -height / 2, 0, 0, 0);
  vertex(width / 2, -height / 2, 0, texture ? 1 : 0, 0);
  vertex(width / 2, height / 2, 0, texture ? 1 : 0, texture ? 1 : 0);
  vertex(-width / 2, height / 2, 0, 0, texture ? 1 : 0);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}