import { Canvas } from "@react-three/fiber"

export const Geometry = () => { 
  return (
    <Canvas>
    {/* <h1>Geometry</h1> */}
    <pointLight position={[10, 10, 10]} />
    <mesh>
      <sphereBufferGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  </Canvas>
  )
}