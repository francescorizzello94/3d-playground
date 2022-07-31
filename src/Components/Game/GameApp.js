import { Suspense, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree, extend } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Wing from '../Game/arwing.glb';
import TargetImg from '../Game/target.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from "three";
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { shipPositionState, laserPositionState } from './gameState';

extend({ OrbitControls });

const GROUND_HEIGHT = -50;

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);

  const ship = useRef();
  useFrame(({ mouse }) => {
    setShipPosition({
      position: {
        x: mouse.x * 6,
        y: mouse.y * 2
      },
      rotation: {
        z: -mouse.x * 0.5,
        x: -mouse.x * 0.5,
        y: -mouse.y * 0.2
      }
    });
  });

  useFrame(() => {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x;
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
  });

  //const group = useRef();
  const { nodes } = useLoader(GLTFLoader, Wing);
 /*  useFrame(() => {
    group.current.rotation.y += 0.004;
  }); */
  return (
    <group ref={ship}>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls
    ref={controls}
    args={[camera, domElement]}
    enableZoom={false}
    maxAzimuthAngle={Math.PI / 4}
    maxPolarAngle={Math.PI}
    minAzimuthAngle={-Math.PI / 4}
    minPolarAngle={0}
  />
}

function Terrain() {
  const terrain = useRef();
  useFrame(() => {
    terrain.current.position.z += 0.4;
  });
  return (
    <mesh
      visible
      position={[0, GROUND_HEIGHT, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[5000, 5000, 128, 128]} />
      <meshStandardMaterial
        attach="material"
        color="blue"
        roughness={1}
        metalness={0}
        wireframe
      />
    </mesh>
  )
}

function Target() { 
  const rearTarget = useRef();
  const frontTarget = useRef();
  const loader = new TextureLoader();
  const texture = loader.load(TargetImg);
  useFrame(({ mouse }) => {
    rearTarget.current.position.y = -mouse.y * 10;
    rearTarget.current.position.x = -mouse.x * 30;

    frontTarget.current.position.y = -mouse.y * 20;
    frontTarget.current.position.x = -mouse.x * 60;
  });
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={rearTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
      <sprite position={[0, 0, -16]} ref={frontTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </group>
  );
}

function Lasers() { 
  const lasers = useRecoilValue(laserPositionState);
  return (
    <group>
      {lasers.map((laser) => (
        <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" emissive="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}

export const GameApp = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas style={{ background: "black" }}>
        <RecoilRoot>
        <CameraControls />
        <directionalLight intensity={1} />
        <ambientLight intensity={0.1} />
        <Suspense fallback={<Loading />}>
          <ArWing />
        </Suspense>
          <Target />
          <Lasers />
        <Terrain />
        </RecoilRoot>
      </Canvas>
    </div>
  );
}