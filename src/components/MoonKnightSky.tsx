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
    scene.fog = new THREE.FogExp2(0x05070B, 0.0008);
    
    // 2. Camera setup - looking straight up into the "sky"
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 100;
    
    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 4. Create Stars (Points)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const posArray = new Float32Array(starCount * 3);
    const colorArray = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      const radius = 600 + Math.random() * 800;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      posArray[i] = x;
      posArray[i + 1] = y;
      posArray[i + 2] = z;

      const mixedColor = new THREE.Color();
      const randColor = Math.random();
      if (randColor > 0.9) {
        mixedColor.setHex(0x00f0ff);
      } else if (randColor > 0.8) {
        mixedColor.setHex(0x9d4edd);
      } else {
        mixedColor.setHex(0xffffff);
      }

      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const starMesh = new THREE.Points(starGeometry, starMaterial);
    scene.add(starMesh);
    starMeshRef.current = starMesh;

    // 5. Animation Loop
    let animationFrameId: number;
    let autoRotate = 0;

    const animate = () => {
      autoRotate += 0.0005;
      
      if (starMeshRef.current) {
        starMeshRef.current.rotation.z = autoRotate + rotationRef.current;
        starMeshRef.current.rotation.x = Math.sin(autoRotate * 0.5) * 0.1;
      }
      
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
      renderer.dispose();
    };
  }, []);

  // 7. Subscribe to Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    rotationRef.current = latest * Math.PI * -8; 
  });

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-[#020408] to-[#0a0d14]"
      style={{ isolation: 'isolate' }}
    >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,rgba(0,0,0,0.8)_80%)]" />
    </div>
  );
};
