import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"
import "./VisualEffects.css"

export const VisualEffects = () => {
  return (
    <div>
      <h1>Visual Effects</h1>
      <div id="description">
        Let the visions take you far away
        <br />
        <nav id="return">
          <Link to="/"> HomePage</Link>
        </nav>
      </div>
    </div>
  )
}