uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uBrightness;

varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, uBrightness);
    #include <colorspace_fragment>
}