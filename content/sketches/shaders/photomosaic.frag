precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;

// palette is sent by the sketch
uniform sampler2D palette;
// number of cols are sent by the sketch
uniform float cols;

// toggles debug
uniform bool debug;



uniform vec4 background;
uniform vec4 foreground;

// target horizontal & vertical resolution
uniform float resolution;

uniform bool avg;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float luma(vec3 color) {
  return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
}

float AVG(vec3 color) {
  return  0.333 *color.r +0.333 *color.g + 0.333 *color.b ;
}

void main() {
  // define in [0.0, resolution] ∈ R
  vec2 symCoord = vTexCoord * resolution;
  // define in [0.0, resolution] ∈ Z
  vec2 pasCoord = floor(symCoord);
  // remap  to [0.0, 1.0] ∈ R
  symCoord = symCoord - pasCoord;
  // remap  to [0.0, 1.0] ∈ R
  pasCoord = pasCoord / vec2(resolution);
  // get vec4 color hash key
  vec4 key = texture2D(source, pasCoord);
  mediump float avg7;
  mediump float luma7;
  mediump float zluma;
  mediump float rluma;
  mediump float zavg;
  mediump float ravg;
  if(avg){
    avg7 =  AVG(key.rgb) * cols;
    zavg = floor(avg7)+ symCoord.s;
    ravg = zavg/cols;
    vec2 fcord = vec2(ravg,symCoord.t);
    vec4 paletteTex = texture2D(palette, fcord);
    gl_FragColor =  paletteTex;
  }else{
    luma7 =  luma(key.rgb) * cols;
    zluma = floor(luma7)+ symCoord.s;
    rluma = zluma/cols;
    vec2 fcord = vec2(rluma,symCoord.t);
    vec4 paletteTex = texture2D(palette, fcord);
    gl_FragColor =  paletteTex;
  } 
}