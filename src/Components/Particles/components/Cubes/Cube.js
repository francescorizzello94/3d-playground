import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import { random } from "lodash";
import { useFrame } from "react-three-fiber";

export default () => {
  const mesh = useRef();
  const time = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(isActive);

  const position = useMemo(() => {
    return [random(-4, 4, true), random(-4, 4, true), random(-4, 4, true)];
  }, []);

  const timeMod = useMemo(() => random(0.2, 5, true), []);

  const color = isHovered ? 0x4a7ac7 : (isActive ? 0xf7e7e5 : 0xf95b3c);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useFrame(() => {
    mesh.current.rotation.y += 0.01 * timeMod;
    if (isActiveRef.current) {
      time.current += 0.03;
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
    }
  });

  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  );

  const onClick = useCallback(
    e => {
      e.stopPropagation();
      setIsActive(v => !v);
    },
    [setIsActive]
  );

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={e => onClick(e)}
      onPointerOver={e => onHover(e, true)}
      onPointerOut={e => onHover(e, false)}
    >
      <torusKnotBufferGeometry attach="geometry" args={[0.2, 0.2, 4]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
};