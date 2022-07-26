import { Component } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


class TorusKnot extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true});
    this.renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
    this.mount.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5;
    const geometry = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.animation();
    this.renderer.render(this.scene, this.camera);
    new OrbitControls(this.camera, this.renderer.domElement);
    window.addEventListener('resize', this.handleWindowResize);
  }

  animation = () => {
    requestAnimationFrame(this.animation);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  handleWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    )
  }
}

export default TorusKnot;