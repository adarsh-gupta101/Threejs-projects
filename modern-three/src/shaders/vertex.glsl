// // uniform vec2 uFrequency;
// // uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
attribute float aDirection;
attribute float aPress;
// attribute float mousePressed;
// uniform sampler2D t1;
// uniform sampler2D t2;
uniform float move;
uniform float time;
uniform vec2 mouse;
uniform float mousePressed;
uniform float transition;





void main() {
        vUv = uv;
        vec3 pos=position;
        //un
        pos.x += sin(move*aSpeed)*10.0;
        pos.y += sin(move*aSpeed)*1000.0;
pos.z=position.z+ move*20.0*aSpeed+aOffset;
pos.z=mod(pos.z,2000.0)-1000.0;


vec3 stable=position;
float dist =distance(stable.xy,mouse);
float area=smoothstep(0.,300.0,dist);
stable.x+=50.*sin(0.1*time*aPress)*aDirection*area*mousePressed;
stable.y+=50.*sin(1.0*time*aPress)*aDirection*area*mousePressed;
stable.z+=200.0*cos(2.0*time*aPress)*aDirection*area*mousePressed;





pos=mix(pos,stable,transition);
//sble
   vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

   gl_PointSize= 2000.0*(1.0 / - mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
    vCoordinates = aCoordinates.xy;
    vPos=pos;
}