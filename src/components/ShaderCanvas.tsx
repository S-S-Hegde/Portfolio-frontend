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

        // Dynamic scroll velocity boost
        float vBoost = clamp(u_velocity * 0.05, 0.0, 1.5);
        float t = u_time * 0.14 + vBoost * 0.45;

        // Pointer distance and fluid drag
        float distToMouse = length(p - mouse);
        float mouseInteraction = smoothstep(0.65, 0.0, distToMouse);
        vec2 mouseForce = normalize(p - mouse + 0.0001) * mouseInteraction * 0.12;

        vec2 coords = p + mouseForce;
        coords.x += sin(coords.y * 3.2 + t * 1.8) * (vBoost * 0.12);

        // Multi-octave organic 3D fluid ribbons
        float n1 = snoise(coords * (0.75 + vBoost * 0.1) + vec2(t * 0.18, -t * 0.14));
        float n2 = snoise(coords * 1.35 - vec2(t * 0.12, t * 0.16) + n1 * 0.35);
        float n3 = snoise(coords * 2.2 + vec2(-t * 0.08, t * 0.20) - n2 * 0.28);
        float f = n1 * 0.50 + n2 * 0.35 + n3 * 0.15;

        // Approximate 3D surface normal gradient from noise for specular 3D depth
        float eps = 0.015;
        float nx = snoise(coords + vec2(eps, 0.0)) - snoise(coords - vec2(eps, 0.0));
        float ny = snoise(coords + vec2(0.0, eps)) - snoise(coords - vec2(0.0, eps));
        vec3 normal = normalize(vec3(-nx, -ny, eps * 4.0));
        vec3 lightDir = normalize(vec3(mouse.x * 2.0, mouse.y * 2.0, 1.2));
        float diffuse = max(dot(normal, lightDir), 0.0);
        float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 16.0);

        // Refined Dark Editorial Color Tokens
        vec3 colorBase      = vec3(0.031, 0.035, 0.047);  // #08090C Obsidian
        vec3 colorLime      = vec3(0.80, 1.0, 0.0);       // #CCFF00 Electric Lime
        vec3 colorTitanium  = vec3(0.88, 0.92, 0.98);     // Titanium Highlight
        vec3 colorSlate     = vec3(0.12, 0.16, 0.24);     // Deep Graphite
        vec3 colorCyanMist  = vec3(0.05, 0.55, 0.70);     // Subtle Cyber Cyan

        vec3 color = colorBase;

        // Wave Layer 1: Electric Lime Fluid Ribbon
        float limeWave = sin(f * 2.6 + coords.x * 0.75 - coords.y * 0.55 + t * 0.75);
        float limeMask = smoothstep(0.40 - vBoost * 0.05, 0.95, limeWave);
        color = mix(color, colorLime, limeMask * (0.18 + vBoost * 0.08));

        // Wave Layer 2: Titanium Specular Contour
        float titaniumWave = cos(f * 2.2 - coords.x * 0.60 + coords.y * 0.70 + t * 0.60);
        float titaniumMask = smoothstep(0.35, 0.92, titaniumWave);
        color = mix(color, colorTitanium, titaniumMask * 0.10);

        // Wave Layer 3: Graphite Slate Depth
        float slateWave = sin(n2 * 2.0 + t * 0.45 - coords.x * 0.40);
        float slateMask = smoothstep(0.20, 0.85, slateWave);
        color = mix(color, colorSlate, slateMask * 0.20);

        // Wave Layer 4: Cyan Mist Ribbon
        float cyanWave = cos(n3 * 1.8 - t * 0.35 + coords.y * 0.45);
        float cyanMask = smoothstep(0.42, 0.96, cyanWave);
        color = mix(color, colorCyanMist, cyanMask * 0.07);

        // Interactive Mouse Proximity Ripple Wave
        float mouseRipple = sin(distToMouse * 14.0 - u_time * 2.4) * 0.5 + 0.5;
        vec3 rippleColor = mix(colorLime, colorTitanium, mouseRipple);
        color += rippleColor * (mouseInteraction * (0.16 + vBoost * 0.06));

        // 3D Specular Highlight glint
        color += colorLime * (specular * 0.22);
        color += colorTitanium * (diffuse * 0.08);

        gl_FragColor = vec4(color, 0.82);
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      style={{ willChange: 'transform' }}
    />
  );
};

