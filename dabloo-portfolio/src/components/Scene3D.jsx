import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei/core/Float.js'
import { Sparkles } from '@react-three/drei/core/Sparkles.js'
import * as THREE from 'three'

function EnergyObject() {
  const object = useRef(null)
  const wireframe = useRef(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    if (!object.current || !wireframe.current || document.hidden) return
    const scrollProgress =
      window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    object.current.rotation.y += delta * 0.13
    object.current.rotation.x = THREE.MathUtils.damp(
      object.current.rotation.x,
      pointer.y * 0.2 + scrollProgress * 0.35,
      3,
      delta,
    )
    object.current.rotation.z = THREE.MathUtils.damp(
      object.current.rotation.z,
      -pointer.x * 0.24,
      3,
      delta,
    )
    wireframe.current.rotation.copy(object.current.rotation)
    object.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08
  })

  return (
    <Float speed={0.65} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={object}>
        <mesh>
          <icosahedronGeometry args={[1.42, 4]} />
          <meshPhysicalMaterial
            color="#2a1451"
            emissive="#471284"
            emissiveIntensity={0.65}
            roughness={0.26}
            metalness={0.78}
            clearcoat={0.9}
            clearcoatRoughness={0.22}
          />
        </mesh>
        <mesh ref={wireframe} scale={1.015}>
          <icosahedronGeometry args={[1.42, 2]} />
          <meshBasicMaterial color="#58eaff" wireframe transparent opacity={0.26} />
        </mesh>
        <mesh scale={0.7}>
          <icosahedronGeometry args={[1.42, 3]} />
          <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.16} />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2.6, 0.2, -0.22]} scale={1.7}>
        <torusGeometry args={[1.42, 0.008, 8, 160]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, -0.25, 0.3]} scale={1.88}>
        <torusGeometry args={[1.42, 0.005, 8, 160]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
      </mesh>
      <Sparkles count={105} scale={4.5} size={2.2} speed={0.16} color="#83eaff" />
    </Float>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 6.3], fov: 40 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      fallback={<div className="canvas-fallback" aria-hidden="true" />}
      aria-hidden="true"
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 2, 4]} color="#00d9ff" intensity={20} distance={9} />
      <pointLight position={[-3, -1, 2]} color="#9d4edd" intensity={18} distance={8} />
      <EnergyObject />
    </Canvas>
  )
}
