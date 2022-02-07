## Workshop 3

{{< p5-iframe2 sketch="/vc/sketches/pixel.js" width="610" height="610" >}}

# Paso 1 Coherencia espacial

El siguiente shader de abajo usa coherencia espacial para muestrear un solo pixel en cada área de baja resolución. El programa toma dos texturas: la fuente (mandril o video) y el carácter ॐ.

Para el desarrollo de este ejemplo se utilizo parte del ejemplo desarrollado en clase, el codigo correspondiente 
se presenta a continuación:

```tpl
{{</* 
let image_src;
let video_src;
let mosaic;
let resolution;
let video_on;
let input;
let img;

function preload() {
  image_src = loadImage('/vc/sketches/mandrill.png');
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
*/>}}
```

{{< p5-iframe2 sketch="/vc/sketches/mosaic.js" width="610" height="610" >}}

# Paso 2 El mosaico fotográfico

El mosaico fotográfico es la técnica de crear una imagen o video con un conjunto de datos de imágenes pequeñas. Para implementarlo usando shaders es necesario primero crear una sola imagen de textura con todas las imágenes pequeñas que queramos usar, luego se fragmenta o pixela la imagen original dependiendo de la cantidad de fragmentos graficos ó imagenes que queramos usar, se realiza un calculo de cirtas caracteristicas de cada pixel de la imagen original para acomodar el fragmento de imagen mas adecuado.

En este paso construimos el Photomosaic, para esto implementamos una clase llamada mosaic.js quien depende de la implementacion de shader pothomosaic.frag, la imagen webm y la imagen sobre la cual se realiza el photomosaic mandrill.png

```tpl
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
  hashcolor();
}
*/>}}
```
# Ejemplo 2 - Coherencia Espacial

{{< p5-iframe2 sketch="/vc/sketches/pixel1.js" width="610" height="610" >}}

# Ejemplo 2 - Photomosaico LUMA

{{< p5-iframe2 sketch="/vc/sketches/mosaic1.js" width="610" height="610" >}}