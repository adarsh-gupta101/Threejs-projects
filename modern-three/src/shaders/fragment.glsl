varying vec2 vCoordinates; 
varying vec3 vPos; 

uniform sampler2D t1;
uniform sampler2D t2;
uniform sampler2D mask;
void main() {
    vec2 myUV=vec2(vCoordinates.x/512.,vCoordinates.y/512.);
    vec4 image= texture2D(t1,myUV);
    vec4 maskTexture=texture2D(mask,gl_PointCoord);

       float alpha=1. - clamp(0.,1.,abs(vPos.z/900.));
    // float alpha=clamp(0.,1.,abs(vPos.z/900.));

    gl_FragColor = image;
    // gl_FragColor= maskTexture;
    gl_FragColor.a *=maskTexture.r*alpha;
    // gl_FragColor=vec4(alpha);
// gl_FragColor = vec4(vCoordinates.x/512.,vCoordinates.y/512., 1.0, 1.0);
    }