import { useEffect, useRef } from "react";
import * as THREE from "three";
import {GUI} from 'dat.gui';

const InteractiveRectangle = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({alpha: true});

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true });
    let cube = new THREE.Mesh(geometry, material);
    

    scene.add(cube);
    camera.position.z = 5;

    let animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}>

    </div>
  );
}

export default InteractiveRectangle;