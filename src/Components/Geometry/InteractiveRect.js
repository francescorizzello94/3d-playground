import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import create from 'zustand'
import { useControl } from 'react-three-gui'

const rpi = () => Math.random() * Math.PI
const [useStore, api] = create(set => ({
  amount: 0,
  boxes: [],
  coords: [],
  create(amount) {
    const ids = new Array(parseInt(amount)).fill().map((_, i) => i)
    set({
      amount,
      boxes: ids,
      coords: ids.reduce((acc, id) => ({ ...acc, [id]: [rpi(), rpi(), rpi()] }), 0)
    })
  },
  advance(state) {
    set(state => {
      const coords = {}
      for (let i = 0, len = state.boxes.length; i < len; i++) {
        const id = state.boxes[i]
        const [x, y, z] = state.coords[id]
        coords[id] = [x + 0.01, y + 0.01, z + 0.01]
      }
      return { ...state, coords }
    })
  }
}))

function ItemSlow({ id }) {
  const coords = useStore(state => state.coords[id])
  if (!coords) return null
  return (
    <mesh rotation={coords}>
      <boxBufferGeometry args={[2, 2, 2]} attach="geometry" />
      <meshNormalMaterial attach="material" wireframe />
    </mesh>
  )
}

function ItemFast({ id }) {
  const mesh = useRef()
  const coords = useRef([0, 0, 0])
  useEffect(() => api.subscribe(xyz => (coords.current = xyz), state => state.coords[id]))
  useFrame(() => mesh.current && mesh.current.rotation.set(...coords.current))
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry args={[2, 2, 2]} attach="geometry" />
      <meshNormalMaterial attach="material" wireframe/>
    </mesh>
  )
}

function MorphingBoxes() {
  const ref = useRef()
  const boxes = useStore(state => state.boxes)
  const amount = useControl('Amount️', { type: 'select', items: [20, 100, 200, 500, 1000, 2000] })
  const root = useControl('React', { type: 'select', group: 'performance', items: ['legacy (slow)', 'concurrent (fast)'] })
  const flux = useControl('Zustand', { type: 'select', group: 'performance', items: ['reactive (slow)', 'transient (fast)'] })
  const concurrent = root === 'concurrent (fast)'
  const transient = flux === 'transient (fast)'
  const Component = transient ? ItemFast : ItemSlow

  useEffect(() => {
    let frame = undefined
    api.getState().create(amount)
    let lastCalledTime = Date.now()
    let fps = 0
    function renderLoop() {
      let delta = (Date.now() - lastCalledTime) / 1000
      lastCalledTime = Date.now()
      fps = 1 / delta
      api.getState().advance()
      frame = requestAnimationFrame(renderLoop)
    }
    renderLoop()
    return () => cancelAnimationFrame(frame)
  }, [amount, concurrent, transient])

  return (
    <div class="main" style={{ background: transient || concurrent ? '#272737' : 'transparent', width: "70vw", height: "70vh" }}>
      <Canvas >
        <ErrorBoundaries>
          {boxes.map(id => (
            <Component key={id} id={id} />
          ))}
        </ErrorBoundaries>
      </Canvas>
      <div ref={ref} class="fps" />
    </div>
  )
}

class ErrorBoundaries extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError = error => ({ hasError: true })
  render = () => (this.state.hasError ? null : this.props.children)
}



export default MorphingBoxes;