import './Geometry.css'
import { useRef, useState } from 'react'
import { Canvas, useFrame, boxBufferGeometry, meshPhongMaterial } from "@react-three/fiber"
import { Link } from "react-router-dom"
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
            <h1>Display Cube</h1>
            <Box />
          </section>
          <section id="geo-sphere-icon">
            <h1>Display Sphere</h1>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function Box() {
  return (
    <div className="App">
      <Canvas>
        <mesh>
          <boxBufferGeometry />
          <meshPhongMaterial />
        </mesh>
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
    </div>
  );
}