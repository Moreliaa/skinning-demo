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
        },

        uniforms: {
        }
    };
    
    let buffers = initBuffers(gl);

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

        // Render
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        {
            gl.useProgram(programInfo.program);

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);
            gl.vertexAttribPointer(programInfo.attributes.position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(programInfo.attributes.position);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer);

            gl.drawElements(gl.LINES, buffers.len, gl.UNSIGNED_BYTE, 0);
        }

        
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}