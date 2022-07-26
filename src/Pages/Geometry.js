import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"
import './Geometry.css'

export const Geometry = () => { 
  return (
    <div>
      <h1>Geometry</h1>
      <div id="description">
        Explore the realm of geometry
        <br />
        <nav id="return">
          <Link to="/"> HomePage</Link>
        </nav>
      </div>
    </div>
  )
}

