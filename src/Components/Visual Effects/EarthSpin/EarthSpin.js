import * as THREE from 'three'
import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import earthImg from './assets/earth.jpg'
import bumpImg from './assets/bump.jpg'
import moonImg from './assets/moon.png'

RectAreaLightUniformsLib.init()

function Earth() {
  const ref = useRef()
  const [texture, bump, moon] = useLoader(THREE.TextureLoader, [earthImg, bumpImg, moonImg])
  useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI))
  return (
    <group ref={ref}>
      <Stars />
      <rectAreaLight intensity={1} position={[10, 10, 10]} width={10} height={1000} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} />
      <rectAreaLight intensity={1} position={[-10, -10, -10]} width={1000} height={10} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} />
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
        <meshStandardMaterial attach="material" map={texture} bumpMap={bump} bumpScale={0.05} />
      </mesh>
      <mesh position={[5, 0, -10]}>
        <sphereBufferGeometry attach="geometry" args={[0.5, 64, 64]} />
        <meshStandardMaterial attach="material" color="gray" map={moon} />
      </mesh>
    </group>
  )
}

export default function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    let positions = []
    for (let i = 0; i < count; i++) {
      const r = 4000
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
      const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)
      positions.push(x)
      positions.push(y)
      positions.push(z)
    }
    return new Float32Array(positions)
  }, [count])
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial attach="material" size={12.5} sizeAttenuation color="white" fog={false} />
    </points>
  )
}

export const EarthApp = () => {
  return (
  <Canvas
    camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}
    onCreated={({ gl }) => {
      gl.gammaInput = true
      gl.toneMapping = THREE.ACESFilmicToneMapping
    }}>
    <pointLight intensity={0.1} position={[10, 10, 10]} />
    <rectAreaLight intensity={3} position={[0, 10, -10]} width={30} height={30} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} />
    <Suspense fallback={null}>
      <Earth />
    </Suspense>
    </Canvas>
  )
}
