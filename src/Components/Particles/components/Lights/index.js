import React from "react";

export default () => {
  const FakeSphere = () => {
    return (
      <mesh>
        <sphereBufferGeometry args={[1.2, 30, 30]} attach="geometry" />
        <meshBasicMaterial color={0x4468d4} attach="material" wireframe/>
      </mesh>
    );
  };

  return (
    <group>
      <FakeSphere />
      <ambientLight intensity={0.9} />
      <pointLight intensity={1.12} position={[0, 0, 0]} />
    </group>
  );
};
