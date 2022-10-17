// // uniform vec2 uFrequency;
// // uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
// uniform sampler2D t1;
// uniform sampler2D t2;
uniform float move;
uniform float time;




void main() {
        vUv = uv;
        vec3 pos=position;
        //un
        pos.x += sin(move*aSpeed)*10.0;
        pos.y += sin(move*aSpeed)*1000.0;
pos.z=position.z+ move*20.0*aSpeed+aOffset;
pos.z=mod(pos.z,2000.0)-1000.0;


vec3 stable=position;
//sble
   vec4 mvPosition = modelViewMatrix * vec4(stable, 1.0);

   gl_PointSize= 2000.0*(1.0 / - mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
    vCoordinates = aCoordinates.xy;
    vPos=pos;
}