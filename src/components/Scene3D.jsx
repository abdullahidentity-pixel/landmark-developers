import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A glossy champagne-gold form that eases toward the pointer — the cinematic
 * centrepiece of the hero. We lerp toward a target derived from normalized
 * pointer coords so motion feels weighted, not twitchy. MeshDistortMaterial is
 * GPU-cheap, keeping it smooth on mobile.
 */
function FollowObject() {
  const mesh = useRef();
  const { pointer, viewport } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const damp = 1 - Math.pow(0.0018, delta);

    target.current.set(
      (pointer.x * viewport.width) / 7,
      (pointer.y * viewport.height) / 7,
      0
    );
    mesh.current.position.lerp(target.current, damp);

    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y,
      pointer.x * 0.6,
      damp
    );
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      -pointer.y * 0.6,
      damp
    );
    mesh.current.rotation.z += delta * 0.04;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.85}>
      <mesh ref={mesh} scale={1.25}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#b8904a"
          emissive="#2a1d08"
          emissiveIntensity={0.35}
          metalness={1}
          roughness={0.22}
          distort={0.3}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      className="scene3d"
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.9} color="#ffe6b0" />
      <directionalLight position={[-6, -3, -4]} intensity={1.1} color="#c98a3a" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#f3d9a0" />
      <Suspense fallback={null}>
        <FollowObject />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
