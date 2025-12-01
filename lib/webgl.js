const canvas = document.getElementById("canvas");
const c = canvas.getContext("webgl");

// Support rgba() strings and array for fillStyle
Object.defineProperty(c, "fillStyle", {
  set(v) {
    const match = v.match?.(/rgba?\(([^)]+)\)/);
    if (match) {
      const nums = match[1].split(",").map((n) => parseFloat(n.trim()));
      if (nums.length === 3) nums.push(1); // add alpha
      c._fillColor = nums.map((n, i) => (i < 3 ? n / 255 : n));
    } else if (Array.isArray(v)) {
      c._fillColor = v;
    } else {
      c._fillColor = [1, 1, 1, 1]; // fallback white
    }
  },
  get() {
    return c._fillColor || [1, 1, 1, 1];
  },
});

// === Shader code ===
const vsSrc = `
attribute vec2 a_position;
uniform vec2 u_resolution;
void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 clip = zeroToOne * 2.0 - 1.0;
  gl_Position = vec4(clip * vec2(1, -1), 0, 1);
}
`;

const fsSrc = `
precision mediump float;
uniform vec4 u_color;
void main() {
  gl_FragColor = u_color;
}
`;

// === Shader helpers ===
function createShader(type, source) {
  const s = c.createShader(type);
  c.shaderSource(s, source);
  c.compileShader(s);
  if (!c.getShaderParameter(s, c.COMPILE_STATUS)) throw c.getShaderInfoLog(s);
  return s;
}
function createProgram(vs, fs) {
  const p = c.createProgram();
  c.attachShader(p, vs);
  c.attachShader(p, fs);
  c.linkProgram(p);
  if (!c.getProgramParameter(p, c.LINK_STATUS)) throw c.getProgramInfoLog(p);
  return p;
}

// === Compile program and buffers ===
const vs = createShader(c.VERTEX_SHADER, vsSrc);
const fs = createShader(c.FRAGMENT_SHADER, fsSrc);
const program = createProgram(vs, fs);
const positionBuffer = c.createBuffer();

// === fillRect ===
c.fillRect = function (x, y, w, h) {
  const color = c.fillStyle;

  c.useProgram(program);
  c.bindBuffer(c.ARRAY_BUFFER, positionBuffer);

  const x1 = x,
    x2 = x + w;
  const y1 = y,
    y2 = y + h;
  const verts = new Float32Array([
    x1,
    y1,
    x2,
    y1,
    x1,
    y2,
    x1,
    y2,
    x2,
    y1,
    x2,
    y2,
  ]);
  c.bufferData(c.ARRAY_BUFFER, verts, c.STATIC_DRAW);

  const posLoc = c.getAttribLocation(program, "a_position");
  c.enableVertexAttribArray(posLoc);
  c.vertexAttribPointer(posLoc, 2, c.FLOAT, false, 0, 0);

  const resLoc = c.getUniformLocation(program, "u_resolution");
  c.uniform2f(resLoc, canvas.width, canvas.height);

  const colorLoc = c.getUniformLocation(program, "u_color");
  c.uniform4fv(colorLoc, color);

  c.drawArrays(c.TRIANGLES, 0, 6); // 🔥 FIXED typo: T-R-I-A-N-G-L-E-S
};

// === clearRect ===
c.clearRect = function (x, y, w, h) {
  const yFlip = c.canvas.height - y - h;
  c.enable(c.SCISSOR_TEST);
  c.scissor(x, yFlip, w, h);
  c.clearColor(0, 0, 0, 0); // Transparent
  c.clear(c.COLOR_BUFFER_BIT);
  c.disable(c.SCISSOR_TEST);
};

// === Init clear ===
c.clearColor(0, 0, 0, 1);
c.clear(c.COLOR_BUFFER_BIT);

// === Usage example ===
// Set up image program only once
let imageProgram = null;
let imageLocs = {};
let imagePosBuffer = null;
let imageTexBuffer = null;

function setupImageProgram() {
  if (imageProgram) return;

  const vs = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    uniform vec2 u_resolution;
    varying vec2 v_texcoord;
    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 clip = zeroToOne * 2.0 - 1.0;
      gl_Position = vec4(clip * vec2(1, -1), 0, 1);
      v_texcoord = a_texcoord;
    }
  `;

  const fs = `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texcoord;
    void main() {
      gl_FragColor = texture2D(u_image, v_texcoord);
    }
  `;

  const vsObj = createShader(c.VERTEX_SHADER, vs);
  const fsObj = createShader(c.FRAGMENT_SHADER, fs);
  imageProgram = createProgram(vsObj, fsObj);

  imageLocs = {
    a_position: c.getAttribLocation(imageProgram, "a_position"),
    a_texcoord: c.getAttribLocation(imageProgram, "a_texcoord"),
    u_resolution: c.getUniformLocation(imageProgram, "u_resolution"),
    u_image: c.getUniformLocation(imageProgram, "u_image"),
  };

  imagePosBuffer = c.createBuffer();
  imageTexBuffer = c.createBuffer();
}

// WebGL drawImage polyfill
c.drawImage = function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
  setupImageProgram();

  // Setup texture
  const tex = c.createTexture();
  c.bindTexture(c.TEXTURE_2D, tex);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
  c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
  c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, true);
  c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, img);

  // Vertex positions (destination on screen)
  const x1 = dx,
    y1 = dy,
    x2 = dx + dw,
    y2 = dy + dh;
  const verts = new Float32Array([
    x1,
    y1,
    x2,
    y1,
    x1,
    y2,
    x1,
    y2,
    x2,
    y1,
    x2,
    y2,
  ]);

  // Texture coords (from source image)
  const tx1 = sx / img.width,
    ty1 = sy / img.height;
  const tx2 = (sx + sw) / img.width,
    ty2 = (sy + sh) / img.height;
  const texCoords = new Float32Array([
    tx1,
    ty1,
    tx2,
    ty1,
    tx1,
    ty2,
    tx1,
    ty2,
    tx2,
    ty1,
    tx2,
    ty2,
  ]);

  c.useProgram(imageProgram);

  // Set resolution
  c.uniform2f(imageLocs.u_resolution, canvas.width, canvas.height);

  // Position buffer
  c.bindBuffer(c.ARRAY_BUFFER, imagePosBuffer);
  c.bufferData(c.ARRAY_BUFFER, verts, c.STATIC_DRAW);
  c.enableVertexAttribArray(imageLocs.a_position);
  c.vertexAttribPointer(imageLocs.a_position, 2, c.FLOAT, false, 0, 0);

  // Texture coord buffer
  c.bindBuffer(c.ARRAY_BUFFER, imageTexBuffer);
  c.bufferData(c.ARRAY_BUFFER, texCoords, c.STATIC_DRAW);
  c.enableVertexAttribArray(imageLocs.a_texcoord);
  c.vertexAttribPointer(imageLocs.a_texcoord, 2, c.FLOAT, false, 0, 0);

  // Texture bind
  c.activeTexture(c.TEXTURE0);
  c.bindTexture(c.TEXTURE_2D, tex);
  c.uniform1i(imageLocs.u_image, 0);

  // Draw
  c.drawArrays(c.TRIANGLES, 0, 6);
};
