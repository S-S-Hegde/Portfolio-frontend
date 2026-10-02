import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export const MoonKnightSky: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const rotationRef = useRef(0);
  const starMeshRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020408, 0.0008);
    
    // 2. Camera setup - looking straight up into the "sky"
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;
    
    // 3. Renderer setup - opaque for trail effect
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClearColor = false;
    renderer.setClearColor(0x020408, 1);
    
    mountRef.current.appendChild(renderer.domElement);

    // Initial clear
    renderer.clear();

    // 4. Create Stars (Points) with custom shader for blinking
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const posArray = new Float32Array(starCount * 3);
    const colorArray = new Float32Array(starCount * 3);
    const phaseArray = new Float32Array(starCount); // For random blinking phase

    for (let i = 0; i < starCount; i++) {
      const radius = 600 + Math.random() * 800;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      const mixedColor = new THREE.Color();
      const randColor = Math.random();
      if (randColor > 0.9) {
        mixedColor.setHex(0x00f0ff);
      } else if (randColor > 0.8) {
        mixedColor.setHex(0x9d4edd);
      } else {
        mixedColor.setHex(0xffffff);
      }

      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;

      phaseArray[i] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starGeometry.setAttribute('a_color', new THREE.BufferAttribute(colorArray, 3));
    starGeometry.setAttribute('a_phase', new THREE.BufferAttribute(phaseArray, 1));

    const uniforms = {
      u_time: { value: 0 }
    };

    const vertexShader = `
      attribute vec3 a_color;
      attribute float a_phase;
      varying vec3 v_color;
      varying float v_phase;
      void main() {
        v_color = a_color;
        v_phase = a_phase;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = (400.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 v_color;
      varying float v_phase;
      uniform float u_time;
      void main() {
        // Create circular points
        vec2 coord = gl_PointCoord - vec2(0.5);
        if(length(coord) > 0.5) discard;
        
        // Blinking effect
        float blink = sin(u_time * 2.0 + v_phase) * 0.5 + 0.5;
        // Make some stars blink faster/deeper
        blink = smoothstep(0.0, 1.0, blink);
        
        gl_FragColor = vec4(v_color, blink * 0.9);
      }
    `;

    const starMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);
    starMeshRef.current = starMesh;

    // Background clearing scene for trails
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgMaterial = new THREE.MeshBasicMaterial({
      color: 0x020408,
      transparent: true,
      opacity: 0.15, // Trail length (lower = longer trails)
      depthWrite: false
    });
    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial);
    bgScene.add(bgMesh);

    // 5. Animation Loop
    let animationFrameId: number;
    let autoRotate = 0;
    const startTime = performance.now();

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001;
      uniforms.u_time.value = time;

      autoRotate += 0.0005;
      
      if (starMeshRef.current) {
        // Smoothly interpolate towards the target rotation to enhance the trail effect
        const targetRotation = autoRotate + rotationRef.current;
        starMeshRef.current.rotation.z += (targetRotation - starMeshRef.current.rotation.z) * 0.1;
        starMeshRef.current.rotation.x = Math.sin(autoRotate * 0.5) * 0.1;
      }
      
      // Render semi-transparent background to create trails
      renderer.render(bgScene, bgCamera);
      
      // Render stars on top
      renderer.render(scene, camera);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // 6. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      starGeometry.dispose();
      starMaterial.dispose();
      bgMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // 7. Subscribe to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Exaggerated rotation to trigger visible trails during scroll
    rotationRef.current = latest * Math.PI * -12; 
  });

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ isolation: 'isolate' }}
    />
  );
};
