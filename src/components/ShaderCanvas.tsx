import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ShaderCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // High-performance GPU WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Optimized GLSL Shaders with Scroll Velocity Ripple
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_velocity;
      varying vec2 vUv;

      // Fast simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = (uv - 0.5);
        p.x *= aspect;

        vec2 mouse = (u_mouse - 0.5);
        mouse.x *= aspect;

        // Base time modulated by scroll velocity
        float vBoost = clamp(u_velocity * 0.04, 0.0, 1.2);
        float t = u_time * 0.12 + vBoost * 0.5;

        // Dynamic turbulence distortion scaled by velocity
        float velocityWarp = sin(p.y * 3.5 + t * 2.0) * (vBoost * 0.15);
        p.x += velocityWarp;

        // Multi-octave organic fluid flow for Aurora ribbons
        float n1 = snoise(p * (0.65 + vBoost * 0.1) + vec2(t * 0.16, -t * 0.13) + mouse * 0.20);
        float n2 = snoise(p * 1.25 - vec2(t * 0.11, t * 0.15) + n1 * 0.38);
        float n3 = snoise(p * 2.0 + vec2(-t * 0.07, t * 0.18) - n2 * 0.25);
        float f = n1 * 0.50 + n2 * 0.35 + n3 * 0.15;

        // Base obsidian cosmic palette
        vec3 colorBase    = vec3(0.010, 0.014, 0.022);
        vec3 colorCyan    = vec3(0.0, 0.92, 1.0);       // #00EAFF Vibrant Aurora Cyan
        vec3 colorEmerald = vec3(0.06, 0.90, 0.62);     // #0FE69E Aurora Borealis Emerald
        vec3 colorPurple  = vec3(0.60, 0.18, 0.94);     // #992EF0 Aurora Violet
        vec3 colorIndigo  = vec3(0.10, 0.36, 0.85);     // #1A5CD9 Ionosphere Indigo

        vec3 color = colorBase;

        // Layer 1: Aurora Cyan Wave with velocity flare
        float cyanWave = sin(f * (2.8 + vBoost * 0.8) + p.x * 0.85 - p.y * 0.65 + t * 0.85);
        color = mix(color, colorCyan, smoothstep(0.30 - vBoost * 0.05, 0.92, cyanWave) * (0.22 + vBoost * 0.08));

        // Layer 2: Aurora Borealis Emerald Wave
        float emeraldWave = cos(f * 2.5 - p.x * 0.70 + p.y * 0.85 + t * 0.70);
        color = mix(color, colorEmerald, smoothstep(0.32, 0.94, emeraldWave) * 0.18);

        // Layer 3: Aurora Violet Ribbon
        float purpleWave = cos(f * 2.3 + p.x * 0.85 + p.y * 1.05 - t * 0.65);
        color = mix(color, colorPurple, smoothstep(0.28, 0.92, purpleWave) * 0.17);

        // Layer 4: Deep Ionosphere Indigo Wave
        float indigoWave = sin(n2 * 2.1 + t * 0.50 - p.x * 0.45);
        color = mix(color, colorIndigo, smoothstep(0.18, 0.88, indigoWave) * 0.14);

        // Interactive Mouse Proximity Glow & Dynamic Aurora Ripple
        float distToMouse = length(p - mouse);
        float mouseGlow = smoothstep(0.68, 0.0, distToMouse);
        float mouseRipple = sin(distToMouse * 12.0 - u_time * 2.2) * 0.5 + 0.5;
        vec3 interactiveAurora = mix(colorCyan, colorEmerald, mouseRipple);
        color += interactiveAurora * (mouseGlow * (0.16 + vBoost * 0.05));

        gl_FragColor = vec4(color, 0.88);
      }
    `;

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_velocity: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking with lerp
    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };

    let lastScrollY = window.scrollY;
    let targetVelocity = 0;
    let currentVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      targetVelocity = Math.min(delta * 0.15, 8.0);
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // High performance render loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      uniforms.u_time.value = (now - startTime) * 0.001;

      // Mouse smooth interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      uniforms.u_mouse.value.set(currentMouse.x, currentMouse.y);

      // Check Lenis scroll instance if available, else use scroll tracker
      const lenis = (window as any).lenisInstance;
      if (lenis && typeof lenis.velocity === 'number') {
        targetVelocity = Math.min(Math.abs(lenis.velocity) * 0.25, 8.0);
      } else {
        // Natural inertial decay
        targetVelocity *= 0.92;
      }

      currentVelocity += (targetVelocity - currentVelocity) * 0.1;
      uniforms.u_velocity.value = currentVelocity;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      style={{ willChange: 'transform' }}
    />
  );
};

