import { initBuffers } from "./buffers.js";
import { initShaderProgram } from "./program.js";

main();

async function main() {
    let canvas = document.querySelector("#glcanvas");

    /** @type {WebGLRenderingContext} */
    let gl = canvas.getContext("webgl");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let program = await initShaderProgram(gl, "vertex.vs", "fragment.fs");
    let programInfo = {
        program: program,
        attributes: {
            position: gl.getAttribLocation(program, "aPosition"),
            weight: gl.getAttribLocation(program, "aWeights"),
        },

        uniforms: {
            bone0: gl.getUniformLocation(program, "uBones[0]"),
            bone1: gl.getUniformLocation(program, "uBones[1]"),
            bone2: gl.getUniformLocation(program, "uBones[2]"),
            bone3: gl.getUniformLocation(program, "uBones[3]"),
        }
    };
    
    let buffers = initBuffers(gl);

    let numBones = 4;
    let boneMatrices = [];
    let bindMatrices = [];
    for (let i = 0; i < numBones; i++) {
        boneMatrices.push(mat4.create());
        bindMatrices.push(mat4.create());
    }

    function computeBoneMatrices(bones, angle) {
        let boneDistance = 0.2;

        let m = mat4.create();
        mat4.rotate(bones[0], m, angle, [0,0,1]);
        mat4.translate(m, bones[0], [boneDistance, 0, 0]);
        
        mat4.rotate(bones[1], m, angle, [0,0,1]);
        mat4.translate(m, bones[1], [boneDistance, 0, 0]);

        mat4.rotate(bones[2], m, angle, [0,0,1]);
        mat4.translate(m, bones[2], [boneDistance, 0, 0]);

        mat4.rotate(bones[3], m, angle, [0,0,1]);
    }

    // compute bind poses
    computeBoneMatrices(bindMatrices, 0);
    // compute bind pose inverses
    let bindMatricesInv = bindMatrices.map((b) => {
        let m = mat4.create();
        mat4.invert(m, b);
        return m;
    });

    let then = 0;

    function checkResize() {
        if (canvas.width !== canvas.clientWidth || canvas.height != canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }

    function render(now) {
        checkResize();

        now = now * 0.001;
        let delta = now - then;
        then = now;

        let angle = Math.sin(now) * 0.2;
        computeBoneMatrices(boneMatrices, angle);

        for (let i = 0; i < boneMatrices.length; i++) {
            mat4.mul(boneMatrices[i], bindMatricesInv[i], boneMatrices[i]);
            //mat4.mul(boneMatrices[i],  boneMatrices[i], bindMatricesInv[i]);
        }

        // Render
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        {
            gl.useProgram(programInfo.program);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);
            gl.vertexAttribPointer(programInfo.attributes.position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(programInfo.attributes.position);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.weightBuffer);
            gl.vertexAttribPointer(programInfo.attributes.weight, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(programInfo.attributes.weight);

            gl.uniformMatrix4fv(programInfo.uniforms.bone0, false, boneMatrices[0]);
            gl.uniformMatrix4fv(programInfo.uniforms.bone1, false, boneMatrices[1]);
            gl.uniformMatrix4fv(programInfo.uniforms.bone2, false, boneMatrices[2]);
            gl.uniformMatrix4fv(programInfo.uniforms.bone3, false, boneMatrices[3]);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer);

            gl.drawElements(gl.LINES, buffers.len, gl.UNSIGNED_BYTE, 0);
        }

        
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}