import './Geometry.css'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import { Link } from "react-router-dom"
import * as dat from 'dat.gui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'

export const Geometry = () => {
  return (
    <div className="wrapper-geometry">
      <h1 className="geometry-header">Geometry</h1>
      <div className="description-geometry">
        Explore the realm of geometry
        <br />
        <nav className="return-geometry">
          <Link to="/"> HomePage</Link>
        </nav>
        <nav className="geometry-menu">
          <a href="#geo-cube-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#geo-sphere-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
        </nav>
        <div className="geometry-icons-wrapper">
          <section id="geo-cube-icon">
            <BoxApp />
          </section>
          <section id="geo-sphere-icon">
            <h1>Display Sphere</h1>
          </section>
        </div>
      </div>
    </div>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
}

export default function BoxApp() {
  return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
  );
}