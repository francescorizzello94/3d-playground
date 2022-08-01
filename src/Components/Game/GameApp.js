import { Suspense, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree, extend } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Wing from '../Game/arwing.glb';
import TargetImg from '../Game/target.png'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from "three";
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { shipPositionState, laserPositionState, enemyPositionState, scoreState } from './gameState';

extend({ OrbitControls });

const GROUND_HEIGHT = -50;
const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 1;
const ENEMY_SPEED = 0.1;


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
        <mesh position={[laser.x, laser.y, laser.z]} key={laser.id}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" emissive="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}

function LaserController() {
  const shipPosition = useRecoilValue(shipPositionState);
  const [lasers, setLasers] = useRecoilState(laserPositionState);
  return (
    <mesh
      position={[0, 0, -8]}
      onClick={() =>
        setLasers([
          ...lasers,
          {
            id: Math.random(),
            x: 0,
            y: 0,
            z: 0,
            velocity: [
              shipPosition.rotation.x * 6,
              shipPosition.rotation.y * 5,
            ],
          },
        ])
      }
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        attach="material"
        color="orange"
        emissive="#ff0860"
        visible={false}
      />
    </mesh>
  );
}

function Enemies() {
  const enemies = useRecoilValue(enemyPositionState);
  return (
    <group>
      {enemies.map((enemy) => (
        <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${enemy.x}`}>
          <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
          <meshStandardMaterial attach="material" color="white" wireframe />
        </mesh>
      ))}
    </group>
  );
}

function distance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

function GameTimer() {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);

  useFrame(({ mouse }) => {
    const hitEnemies = enemies
      ? enemies.map(
        (enemy) =>
          lasers.filter(
            (laser) =>
              lasers.filter((laser) => distance(laser, enemy) < 3).length > 0
          ).length > 0
      )
      : [];

    if (hitEnemies.includes(true) && enemies.length > 0) {
      setScore(score + hitEnemies.filter((hit) => hit).length);
    }
    setEnemies(
      enemies
        .map((enemy) => (
          {
            x: enemy.x,
            y: enemy.y,
            z: enemy.z + ENEMY_SPEED
          }))
        .filter((enemy, idx) => !hitEnemies[idx] && enemy.z < 0)
    );
    setLaserPositions(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          z: laser.z - LASER_Z_VELOCITY,
          velocity: laser.velocity,
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    );
  });
  return null;
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
          <Enemies />
          <Lasers />
          <Terrain />
          <LaserController />
          <GameTimer />
        </RecoilRoot>
      </Canvas>
    </div>
  );
}