import "./VisualEffects.css"
import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"

export const VisualEffects = () => {
  return (
    <div class="wrapper-effects">
      <h1>Visual Effects</h1>
      <div class="description-effects">
        Let the visions take you far away
        <br />
        <nav class="return-effects">
          <Link to="/"> HomePage</Link>
        </nav>
      </div>
    </div>
  )
}