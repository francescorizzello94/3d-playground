import { useControls } from 'leva';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import { Controls, useControl } from 'react-three-gui';

function ThreeInteractiveBoxes({ speed, ...props }) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(true);

  useFrame(
    () =>
      (mesh.current.rotation.x = mesh.current.rotation.y += active ? speed : 0),
  );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'tomato' : 'steelblue'}
      />
    </mesh>
  );
}

export default function ThreeCubesApp() {
  const { animation: { to: rotateSpeed = 0 } = {} } = useControl('Rotate Speed', {
    type: 'number',
    min: -0.1,
    max: 0.1,
    spring: true,
  });

  return (
    <>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ThreeInteractiveBoxes position={[-2, 0, 0]} speed={rotateSpeed} />
          <ThreeInteractiveBoxes position={[0, 0, 0]} speed={rotateSpeed} />
          <ThreeInteractiveBoxes position={[2, 0, 0]} speed={rotateSpeed} />
        </Canvas>
        <Controls />
    </>
  );
}