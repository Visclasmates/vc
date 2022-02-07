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
1. Codigo de clase de la pagina del curso prof.js

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

# Referencias

1. Codigo de clase de la pagina del curso prof.js, no tengo la referencia pues el archivo me fue compartido por uno de mis compañeros.

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

const SAMPLE_RES = 30;

function preload() {
  video_src = createVideo(['/sketches/shaders/mandrill.webm']);
  video_src.hide(); // by default video shows up in separate dom
  mosaic = readShader('/sketches/shaders/photomosaic.frag');
  p = [];
  for (let i = 1; i <= 30; i++) {
    p.push(loadImage(`/sketches/shaders/paintings/p${i}.jpg`));
  }
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(p);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  sel = createSelect();
  sel.position(10, 125);
  sel.option('keys');
  sel.option('symbols');
  sel.selected('symbols');
  sel.changed(() => {
    mosaic.setUniform('debug', sel.value() === 'keys');
    mosaic.setUniform('color_on', false);
  });
  video_on = createCheckbox('video', false);
  video_on.style('color', 'magenta');
  video_on.changed(() => {
    if (video_on.checked()) {
      mosaic.setUniform('source', video_src);
      video_src.loop();
    } else {
      mosaic.setUniform('source', random(p));
      video_src.pause();
    }
  });
  video_on.position(10, 80);
  mosaic.setUniform('source', random(p));
  resolution = createSlider(10, 200, SAMPLE_RES, 1);
  resolution.position(10, 100);
  resolution.style('width', '80px');
  resolution.input(() => { mosaic.setUniform('resolution', resolution.value()) });
  mosaic.setUniform('resolution', resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  mosaic.setUniform('cols', imageCells.width);
  sample();
}

function keyPressed() {
  if (key === 'r' && !video_on.checked()) {
    mosaic.setUniform('source', random(p));
  }
}

function sample() {
  if (pg.width !== SAMPLE_RES * imageCells.width) {
    pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
    mosaic.setUniform('cols', imageCells.width);
  }
  imageCells.sort({ ascending: true, cellLength: SAMPLE_RES });
  drawQuadrille(imageCells, { graphics: pg, cellLength: SAMPLE_RES, outlineWeight: 0 });
  mosaic.setUniform('palette', pg);
}

function draw() {
  cover({ texture: true });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/>}}
```

2. Fragmen-Shader. Usamos como fuente el fragmen.shader de otro del grupo 7, al buscar ejemplos en github, 
   Fue tomado como referencia para correr el ejemplo de clase me disculpo por el error de citarlo pues pense que era un ejemplo de clase. 
   [photomosaic.frag](https://github.com/Computacion-Visual-Gr7/vc/blob/main/content/sketches/shaders/photomosaic.frag).


3. Otras implementaciones en el codigo de coherencia espacial.
   [Fuente](https://visualcomputing.github.io/docs/shaders/spatial_coherence/).
   

4. Otras referencias de implementaciones semestres anteriores.
    [Fuente](https://ccgomezn.github.io/vc/).
    [Fuente](https://edprietov.github.io/vc/).


   
