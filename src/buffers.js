export function initBuffers(gl) {
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let y0 = 0.2;
    let y1 = -0.2;
    let vertices = [ // x y
        0.0,   y0, // 0 
        0.1,   y0, // 1
        0.2,   y0, // 2
        0.3,   y0, // 3
        0.4,   y0, // 4
        0.5,   y0, // 5
        0.6,   y0, // 6
        0.7,   y0, // 7
        0.0,   y1, // 8
        0.1,   y1, // 9
        0.2,   y1, // 10
        0.3,   y1, // 11
        0.4,   y1, // 12
        0.5,   y1, // 13
        0.6,   y1, // 14
        0.7,   y1, // 15
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let weights = [
        1.0, 0.0, 0.0, 0.0, // 0
        0.5, 0.5, 0.0, 0.0, // 1
        0.0, 1.0, 0.0, 0.0, // 2
        0.0, 0.5, 0.5, 0.0, // 3
        0.0, 0.0, 1.0, 0.0, // 4
        0.0, 0.0, 0.5, 0.5, // 5
        0.0, 0.0, 0.0, 1.0, // 6
        0.0, 0.0, 0.0, 0.5, // 7
        1.0, 0.0, 0.0, 0.0, // 8
        0.5, 0.5, 0.0, 0.0, // 9
        0.0, 1.0, 0.0, 0.0, // 10
        0.0, 0.5, 0.5, 0.0, // 11
        0.0, 0.0, 1.0, 0.0, // 12
        0.0, 0.0, 0.5, 0.5, // 13
        0.0, 0.0, 0.0, 1.0, // 14
        0.0, 0.0, 0.0, 0.5, // 15
    ];
    let weightBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, weightBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(weights), gl.STATIC_DRAW);

    let elementArrayBuffer = [
        0,1,
        1,2,
        2,3,
        3,4,
        4,5,
        5,6,
        //6,7,
        // second row
        8,9,
        9,10,
        10,11,
        11,12,
        12,13,
        13,14,
        //14,15,
        //top-bottom connections
        0,8,
        1,9,
        2,10,
        3,11,
        4,12,
        5,13,
        6,14,
        //7,15,
    ];

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elementArrayBuffer), gl.STATIC_DRAW);

    return { vertexBuffer, weightBuffer, indexBuffer, len: elementArrayBuffer.length};
}