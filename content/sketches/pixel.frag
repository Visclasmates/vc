precision mediump float;
// img (image or video) is sent by the sketch
uniform sampler2D img;

// target horizontal & vertical resolution
uniform float resolution;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {
    // remap omCoord to [0.0, resolution] ∈ R
    vec2 omCoord = vTexCoord * resolution;
    // remap imgCoord to [0.0, resolution] ∈ Z
    vec2 imgCoord = floor(omCoord);
    // remap omCoord to [0.0, 1.0] ∈ R
    omCoord = omCoord - imgCoord;
    // remap imgCoord to [0.0, 1.0] ∈ R
    imgCoord = imgCoord / vec2(resolution);
    // image texel (may be used as color hash key, e.g., photomosaic)
    vec4 imgTexel = texture2D(img, imgCoord);
    
    gl_FragColor = imgTexel;
    
  
}