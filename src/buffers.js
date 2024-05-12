export function initBuffers(gl) {
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let vertices = [ // x y
        0.0,   0.0, // 0 
        0.1,   0.0, // 1
        0.2,   0.0, // 2
        0.3,   0.0, // 3
        0.4,   0.0, // 4
        0.5,   0.0, // 5
        0.6,   0.0, // 6
        0.7,   0.0, // 7
        0.0,  -0.2, // 8
        0.1,  -0.2, // 9
        0.2,  -0.2, // 10
        0.3,  -0.2, // 11
        0.4,  -0.2, // 12
        0.5,  -0.2, // 13
        0.6,  -0.2, // 14
        0.7,  -0.2, // 15
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
        6,7,
        // second row
        8,9,
        9,10,
        10,11,
        11,12,
        12,13,
        13,14,
        14,15,
        //top-bottom connections
        0,8,
        1,9,
        2,10,
        3,11,
        4,12,
        5,13,
        6,14,
        7,15,
    ];

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elementArrayBuffer), gl.STATIC_DRAW);

    return { vertexBuffer, weightBuffer, indexBuffer, len: elementArrayBuffer.length};
}