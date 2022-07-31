import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Dodecahedron } from "@react-three/drei";


const Scene = ({ x, y, z }) => {
  const box = useRef();
  const vec = new THREE.Vector3(x, y, z);
  useFrame(() => box.current.position.lerp(vec, 0.1));
  return (
    <Dodecahedron ref={box}>
      <meshLambertMaterial attach="material" color="magenta" wireframe/>
    </Dodecahedron>
  );
};

export default function ManipulateSingleCubeApp() {
  const [position, setPosition] = useState({ x: 1, y: 0, z: 0 });
  const { x, y, z } = position;
  return (
    <>
      <div className="controls">
        <label>x</label>
        <input
          onChange={(e) => setPosition({ ...position, x: e.target.value })}
          value={position.x}
          type="range"
          min='-5'
          max='5'
        />
        <label>y</label>
        <input
          onChange={(e) => setPosition({ ...position, y: e.target.value })}
          value={position.y}
          type="range"
          min='-5'
          max='5'
        />
        <label>z</label>
        <input
          onChange={(e) => setPosition({ ...position, z: e.target.value })}
          value={position.z}
          type="range"
          min='-5'
          max='5'
        />
      </div>
      <Canvas>
        <ambientLight intensity={0.2} />
        <Scene x={x} y={y} z={z} />
      </Canvas>
    </>
  );
}
