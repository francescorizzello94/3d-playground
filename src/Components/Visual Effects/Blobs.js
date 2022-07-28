import { Canvas } from "react-three-fiber";

import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere
} from "@react-three/drei";

function BlobApp() {
  return (
    <mesh
      visible // object gets render if true
      userData={{ test: "hello" }} // An object that can be used to store custom data about the Object3d
      position={[0, 0, 0]} // The position on the canvas of the object [x,y,x]
      rotation={[0, 0, 0]} // The rotation of the object
      castShadow // Sets whether or not the object cats a shadow
    // There are many more props.....
    >
      {/* A spherical shape*/}
      <sphereGeometry attach="geometry" args={[1, 16, 200]} />
      {/* A standard mesh material*/}
      <meshStandardMaterial
        attach="material" // How the element should attach itself to its parent
        color="#7222D3" // The color of the material
        transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
        roughness={0.1} // The roughness of the material - Defaults to 1
        metalness={0.1} // The metalness of the material - Defaults to 0
      />
    </mesh>
  )
}

export default function ExportVisual() {
  return (
  <Canvas>
    
    {/*An ambient light that creates a soft light against the object */}
    <ambientLight intensity={0.5} />
    {/*An directional light which aims form the given position */}
    <directionalLight position={[10, 10, 5]} intensity={1} />
    {/*An point light, basically the same as directional. This one points from under */}
    <pointLight position={[0, -10, 5]} intensity={1} />
      <BlobApp>
    {/* We can use the drei Sphere which has a simple API. This sphere has a wobble material attached to it */}
    <Sphere visible position={[-3, 0, 0]} args={[1, 16, 200]}>
      <MeshWobbleMaterial
        attach="material"
        color="#EB1E99"
        factor={1} // Strength, 0 disables the effect (default=1)
        speed={2} // Speed (default=1)
        roughness={0}
      />
        </Sphere>
        

    {/* This sphere has a distort material attached to it */}
    <Sphere visible position={[3, 0, 0]} args={[1, 16, 200]}>
      <MeshDistortMaterial
        color="#00A38D"
        attach="material"
        distort={0.5} // Strength, 0 disables the effect (default=1)
        speed={2} // Speed (default=1)
        roughness={0}
      />
      </Sphere>
    </BlobApp>
    </Canvas>
  )
}
