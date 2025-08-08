import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

export default function CricketAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current || !window.THREE) return;

    const THREE = window.THREE;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Cricket ball
    const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff0000,
      transparent: true,
      opacity: 0.8
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Cricket bat (simplified)
    const batGeometry = new THREE.BoxGeometry(0.05, 1, 0.1);
    const batMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8B4513,
      transparent: true,
      opacity: 0.7
    });
    const bat = new THREE.Mesh(batGeometry, batMaterial);
    scene.add(bat);

    // Wickets (stumps)
    const stumpGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
    const stumpMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.6
    });
    
    const wickets: any[] = [];
    for (let i = 0; i < 3; i++) {
      const stump = new THREE.Mesh(stumpGeometry, stumpMaterial);
      stump.position.set(-0.1 + i * 0.1, 0, 2);
      scene.add(stump);
      wickets.push(stump);
    }

    // Position elements
    camera.position.z = 5;
    ball.position.set(-3, 1, 0);
    bat.position.set(1, -0.5, 1);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation
    function animate() {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Animate ball movement
      ball.rotation.x += 0.02;
      ball.rotation.y += 0.02;
      ball.position.x += 0.03;
      ball.position.y = 1 + Math.sin(ball.position.x * 0.5) * 0.3;
      
      if (ball.position.x > 4) {
        ball.position.x = -4;
      }

      // Animate bat
      bat.rotation.z = Math.sin(Date.now() * 0.001) * 0.3;

      // Animate wickets with glow effect
      wickets.forEach((stump, index) => {
        stump.position.y = Math.sin(Date.now() * 0.002 + index * 0.5) * 0.1;
      });

      renderer.render(scene, camera);
    }
    
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-1"
      style={{ zIndex: 1 }}
    />
  );
}