import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Box } from "@react-three/drei";


const Scene = ({ x, y, z }) => {
  const box = useRef();
  const vec = new THREE.Vector3(x, y, z);
  useFrame(() => box.current.position.lerp(vec, 0.1));
  return (
    <Box ref={box}>
      <meshLambertMaterial attach="material" color="white" />
    </Box>
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
          type="number"
        />
        <label>y</label>
        <input
          onChange={(e) => setPosition({ ...position, y: e.target.value })}
          value={position.y}
          type="number"
        />
        <label>z</label>
        <input
          onChange={(e) => setPosition({ ...position, z: e.target.value })}
          value={position.z}
          type="number"
        />
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Scene x={x} y={y} z={z} />
      </Canvas>
    </>
  );
}
