import React, { useEffect, useRef } from 'react';

/**
 * AmbientDualShader
 * Direct port of Anuj's NeuraFace Studio dual-theme WebGL background:
 * 1. Dark Theme: "Static Mesh Gradient" (#081326, #04052E, #6941E1, #916BBF) with film grain
 * 2. Light Theme: "Silk" pearlescent white/sky hues with subtle fluid motion
 * Interactive cursor presence and smooth transition when theme changes.
 */

interface AmbientDualShaderProps {
  theme: 'dark' | 'light';
  className?: string;
}

export const AmbientDualShader: React.FC<AmbientDualShaderProps> = ({ 
  theme,
  className = "absolute inset-0 w-full h-full pointer-events-none" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: "low-power"
    }) || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsHeader = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif

      uniform vec3 u_colors[8];
      uniform vec4 u_scene;      // resolution.xy, time, colour count
      uniform vec4 u_shape;      // scale, intensity, paramA, warp
      uniform vec4 u_surface;    // detail, contrast, brightness, saturation
      uniform vec4 u_finish;     // hue, vignette, blur, grain
      uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
      uniform vec4 u_space;      // offset.xy, pointer.xy
      uniform vec4 u_cursor;

      #define u_resolution u_scene.xy
      #define u_time u_scene.z
      #define u_colorCount u_scene.w
      #define u_scale u_shape.x
      #define u_intensity u_shape.y
      #define u_paramA u_shape.z
      #define u_warp u_shape.w
      #define u_detail u_surface.x
      #define u_contrast u_surface.y
      #define u_brightness u_surface.z
      #define u_saturation u_surface.w
      #define u_hue u_finish.x
      #define u_vignette u_finish.y
      #define u_blur u_finish.z
      #define u_grain u_finish.w
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      #define u_seed u_transform.x
      #else
      #define u_seed mod(u_transform.x, 31.0)
      #endif
      #define u_rotate u_transform.y
      #define u_drift u_transform.z
      #define u_oklab u_transform.w
      #define u_offset u_space.xy
      #define u_mouse u_space.zw
      #define u_cursorPresence u_cursor.x
      #define u_cursorEffect u_cursor.y
      #define u_cursorStrength u_cursor.z
      #define u_cursorRadius u_cursor.w

      float hash21(vec2 p) {
      #ifndef GL_FRAGMENT_PRECISION_HIGH
        p = mod(p, 31.0);
      #endif
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float grainHash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      vec2 hash22(vec2 p) {
      #ifndef GL_FRAGMENT_PRECISION_HIGH
        p = mod(p, 31.0);
      #endif
        float n = sin(dot(p, vec2(41.0, 289.0)));
        return fract(vec2(15731.743, 7892.321) * n);
      }

      vec3 srgbToLinear(vec3 c) {
        return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
      }
      vec3 linearToSrgb(vec3 c) {
        return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
      }

      vec3 mixColour(vec3 c1, vec3 c2, float t) {
        return srgbToLinear(mix(linearToSrgb(c1), linearToSrgb(c2), t));
      }

      vec3 palette(float x) {
        float n = max(u_colorCount - 1.0, 1.0);
        float f = clamp(x, 0.0, 1.0) * n;
        vec3 col = u_colors[0];
        for (int i = 0; i < 7; i++) {
          if (float(i) < n)
            col = mixColour(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
        }
        return col;
      }

      vec3 hueRotate(vec3 col, float a) {
        float angle = a * 6.28318530718;
        vec3 k = vec3(0.57735);
        float cosA = cos(angle);
        return col * cosA + cross(k, col) * sin(angle) + k * dot(k, col) * (1.0 - cosA);
      }
    `;

    const fsShadeDark = `
      vec3 shade(vec2 uv, vec2 p, float t) {
        vec3 color = u_colors[0] * 0.2;
        float weight = 0.2;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= u_colorCount) break;
          float fi = float(i);
          vec2 center = (hash22(vec2(fi, u_seed)) - 0.5) * (0.7 + u_intensity * 1.4);
          float influence = exp(-dot(p - center, p - center) * mix(13.0, 2.0, u_paramA));
          color += u_colors[i] * influence;
          weight += influence;
        }
        return color / weight;
      }
    `;

    const fsShadeLight = `
      vec3 shade(vec2 uv, vec2 p, float t) {
        vec2 q = p * 1.6;
        float amp = 0.25 + u_intensity * 0.85;
        for (float i = 1.0; i < 5.0; i += 1.0) {
          q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + u_seed);
          q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6);
        }
        return palette(0.5 + 0.5 * sin(q.x + q.y));
      }
    `;

    const fsMain = `
      void main() {
        vec2 screenUv = gl_FragCoord.xy / u_resolution;
        vec2 uv = screenUv - 0.5;
        uv.x *= u_resolution.x / u_resolution.y;
        vec2 p = uv * u_scale + u_offset;

        vec3 col = shade(uv, p, u_time);

        if (abs(u_contrast - 1.0) > 0.0001)
          col = (col - 0.5) * u_contrast + 0.5;
        if (abs(u_saturation - 1.0) > 0.0001) {
          float luma = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(luma), col, u_saturation);
        }
        if (abs(u_hue) > 0.0001)
          col = hueRotate(col, u_hue);
        if (abs(u_brightness) > 0.0001)
          col += u_brightness;
        if (u_vignette > 0.0001) {
          float vd = length(screenUv - 0.5) * 1.41421356;
          col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
        }
        if (u_grain > 0.0001)
          col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    function createProgram(fsShadeSource: string) {
      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsHeader + fsShadeSource + fsMain);
      if (!vs || !fs) return null;
      const prog = gl.createProgram();
      if (!prog) return null;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        return null;
      }
      return {
        program: prog,
        uni: {
          colors: gl.getUniformLocation(prog, "u_colors") || gl.getUniformLocation(prog, "u_colors[0]"),
          scene: gl.getUniformLocation(prog, "u_scene"),
          shape: gl.getUniformLocation(prog, "u_shape"),
          surface: gl.getUniformLocation(prog, "u_surface"),
          finish: gl.getUniformLocation(prog, "u_finish"),
          transform: gl.getUniformLocation(prog, "u_transform"),
          space: gl.getUniformLocation(prog, "u_space"),
          cursor: gl.getUniformLocation(prog, "u_cursor")
        }
      };
    }

    const darkShader = createProgram(fsShadeDark);
    const lightShader = createProgram(fsShadeLight);
    if (!darkShader || !lightShader) return;

    // Fullscreen triangle buffer
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    // Dark Palette: Cosmic Electric Blue Nebula matching artwork (#02040a, #001f5c, #0052ff, #00aaff)
    const darkColors = new Float32Array([
      0.008, 0.016, 0.040,
      0.000, 0.122, 0.360,
      0.000, 0.320, 1.000,
      0.000, 0.667, 1.000,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 0.0
    ]);

    // Light Palette: Radiant sky-blue / cyan ambient glow fading to white (matching user's uploaded light theme shader)
    const lightColors = new Float32Array([
      0.08, 0.52, 0.95,   // Deep sky blue (#1485f2)
      0.22, 0.74, 0.98,   // Vibrant cyan (#38bdf8)
      0.65, 0.85, 0.98,   // Soft azure (#a5d8f9)
      0.96, 0.98, 1.00,   // Frosted white (#f6f9fc)
      1.00, 1.00, 1.00,   // Pure white
      1.00, 1.00, 1.00,
      1.00, 1.00, 1.00,
      1.00, 1.00, 1.00
    ]);

    let targetPointerX = 0, targetPointerY = 0;
    let pointerX = 0, pointerY = 0;
    let targetPresence = 0, currentPresence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetPresence = 1.0;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetPointerX = (e.clientX / w) * 2.0 - 1.0;
      targetPointerY = 1.0 - (e.clientY / h) * 2.0;
    };

    const handleMouseLeave = () => {
      targetPresence = 0.0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    let isRunning = true;
    let rafId: number | null = null;
    const startTime = performance.now();

    function resize() {
      if (!canvas) return;
      // Ambient mesh/silk background gradients do not need retina supersampling.
      // 0.6x - 0.75x resolution provides identical soft ambient aesthetics while cutting GPU fragment work by ~75%.
      const dpr = Math.max(0.5, Math.min(window.devicePixelRatio || 1, 1.0) * 0.65);
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    let resizeDebounce: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeDebounce) clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(resize, 60);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let lastFrameTime = 0;
    const targetFpsInterval = 1000 / 60; // Max 60 FPS cap to prevent 120Hz/240Hz GPU thermal throttling

    function render(now: number) {
      if (!isRunning) return;

      rafId = requestAnimationFrame(render);

      // Frame throttle to standard 60fps to save GPU cycles for smooth page scrolling
      const elapsed = now - lastFrameTime;
      if (elapsed < targetFpsInterval - 2) return;
      lastFrameTime = now;

      const seconds = (now - startTime) * 0.001;

      pointerX += (targetPointerX - pointerX) * 0.08;
      pointerY += (targetPointerY - pointerY) * 0.08;
      currentPresence += (targetPresence - currentPresence) * 0.05;

      const isDark = themeRef.current === 'dark';
      const currentShader = isDark ? darkShader : lightShader;
      const uni = currentShader.uni;

      gl.useProgram(currentShader.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      const aPos = gl.getAttribLocation(currentShader.program, "a_position");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      if (isDark) {
        // Dark Theme (Static Mesh Gradient)
        if (uni.colors) gl.uniform3fv(uni.colors, darkColors);
        if (uni.scene) gl.uniform4f(uni.scene, canvas.width, canvas.height, seconds * 0.27, 4.0);
        if (uni.shape) gl.uniform4f(uni.shape, 1.26, 0.35, 0.28, 0.00);
        if (uni.surface) gl.uniform4f(uni.surface, 1.82, 1.00, 0.00, 1.00);
        if (uni.finish) gl.uniform4f(uni.finish, 0.00, 0.00, 0.000, 0.04);
        if (uni.transform) gl.uniform4f(uni.transform, 1.0, 0.00, 0.00, 1.0);
        if (uni.space) gl.uniform4f(uni.space, 0.00, 0.00, pointerX, pointerY);
        if (uni.cursor) gl.uniform4f(uni.cursor, currentPresence, 2.0, 0.27, 0.73);
      } else {
        // Light Theme (Radiant Sky Cyan & Frosted White)
        if (uni.colors) gl.uniform3fv(uni.colors, lightColors);
        if (uni.scene) gl.uniform4f(uni.scene, canvas.width, canvas.height, seconds * 0.18, 5.0);
        if (uni.shape) gl.uniform4f(uni.shape, 1.15, 0.32, 0.45, 0.00);
        if (uni.surface) gl.uniform4f(uni.surface, 2.20, 1.08, -0.02, 1.15);
        if (uni.finish) gl.uniform4f(uni.finish, 0.00, 0.00, 0.000, 0.028);
        if (uni.transform) gl.uniform4f(uni.transform, 1581.0, 0.00, 0.00, 0.0);
        if (uni.space) gl.uniform4f(uni.space, 0.00, 0.00, pointerX, pointerY);
        if (uni.cursor) gl.uniform4f(uni.cursor, currentPresence * 0.7, 2.0, 0.55, 0.50);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    resize();
    rafId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        if (!isRunning) {
          isRunning = true;
          lastFrameTime = performance.now();
          rafId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (resizeDebounce) clearTimeout(resizeDebounce);
      document.removeEventListener("visibilitychange", handleVisibility);
      gl.deleteBuffer(posBuffer);
      gl.deleteProgram(darkShader.program);
      gl.deleteProgram(lightShader.program);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className} 
      style={{ display: "block", width: "100%", height: "100%" }} 
    />
  );
};
