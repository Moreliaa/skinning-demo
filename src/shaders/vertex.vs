#define MAX_BONES 4

attribute vec2 aPosition;
attribute vec4 aWeights;
uniform mat4 uBones[MAX_BONES];

void main() {
    highp vec4 pos = vec4(aPosition, -1.0, 1.0);
    gl_Position =   uBones[0] * pos * aWeights[0] +
                    uBones[1] * pos * aWeights[1] +
                    uBones[2] * pos * aWeights[2] +
                    uBones[3] * pos * aWeights[3];
}