"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/store/useStore";

const VERT_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG_SRC = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform float u_progress;
  uniform vec3  u_color1;
  uniform vec3  u_color2;

  vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289v3(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x2 = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x2) - 0.5;
    vec3 ox = floor(x2 + 0.5);
    vec3 a0 = x2 - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz  + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    vec2  shift = vec2(100.0);
    mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p  = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = v_uv;
    float n = fbm(uv * 3.5 + vec2(u_time * 0.18, u_time * 0.12));
    n = n * 0.5 + 0.5;
    float edgeWidth = 0.18;
    float alpha = smoothstep(n - edgeWidth, n, u_progress)
                - smoothstep(n, n + edgeWidth, u_progress);
    alpha = clamp(alpha * 2.2, 0.0, 1.0);
    float t = smoothstep(0.0, 1.0, u_progress);
    vec3 col = mix(u_color1, u_color2, t);
    col += 0.25 * alpha * u_color1;
    gl_FragColor = vec4(col, alpha);
  }
`;

function useNoiseTransition(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  palette: [[number,number,number],[number,number,number],[number,number,number]]
) {
  const glRef   = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const rafRef  = useRef<number>(0);
  const startRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const DURATION = 0.9;

  const compile = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return false;
    glRef.current = gl;

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    progRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    return true;
  }, [canvasRef]);

  const play = useCallback(() => {
    if (isRunningRef.current) {
      cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ready = glRef.current && progRef.current ? true : compile();
    if (!ready || !glRef.current || !progRef.current) return;

    const gl   = glRef.current;
    const prog = progRef.current;

    canvas.style.opacity = "1";
    canvas.style.pointerEvents = "auto";
    isRunningRef.current = true;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed  = (now - startRef.current) / 1000;
      const progress = Math.min(elapsed / DURATION, 1);

      const W = canvas.offsetWidth  || window.innerWidth;
      const H = canvas.offsetHeight || window.innerHeight;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width  = W;
        canvas.height = H;
      }
      gl.viewport(0, 0, W, H);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform1f(gl.getUniformLocation(prog, "u_time"),     elapsed);
      gl.uniform1f(gl.getUniformLocation(prog, "u_progress"), progress);
      gl.uniform3fv(gl.getUniformLocation(prog, "u_color1"),  palette[0]);
      gl.uniform3fv(gl.getUniformLocation(prog, "u_color2"),  palette[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        canvas.style.opacity       = "0";
        canvas.style.pointerEvents = "none";
        isRunningRef.current       = false;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [compile, canvasRef, palette]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);
  return { play };
}

export default function ModelTransitionOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentVilla      = useStore((s) => s.currentVilla);
  const currentModelIndex = useStore((s) => s.currentModelIndex);
  const palette           = currentVilla.shaderPalette;

  const { play } = useNoiseTransition(canvasRef, palette);

  const prevIndexRef = useRef<number | null>(null);
  useEffect(() => {
    if (prevIndexRef.current === null) {
      prevIndexRef.current = currentModelIndex;
      return;
    }
    if (prevIndexRef.current !== currentModelIndex) {
      prevIndexRef.current = currentModelIndex;
      play();
    }
  }, [currentModelIndex, play]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 15, opacity: 0, pointerEvents: "none", transition: "opacity 0.05s" }}
      aria-hidden="true"
    />
  );
}