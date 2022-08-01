import { useState, useRef } from "react"
import { Canvas, useFrame } from "react-three-fiber"

function Dode() {
  const [hover, set] = useState(false)

  const ref = useRef()
  useFrame(() => {
    let scale = (ref.current.scale.x += ((hover ? 1.5 : 1) - ref.current.scale.x) * 0.1)
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={ref} onPointerOver={() => set(true)} onPointerOut={() => set(false)} castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default function ExportVisual() {
  return (
    <Canvas shadowMap camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Dode />
    </Canvas>
  )
}

