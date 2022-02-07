precision mediump float;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = vec4(vTexCoord.xy, 0.0, 1.0 );
}