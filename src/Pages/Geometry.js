import './Geometry.css'
import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"


export const Geometry = () => { 
  return (
    <div class="wrapper-geometry">
      <h1>Geometry</h1>
      <div class="description-geometry">
        Explore the realm of geometry
        <br />
        <nav class="return-geometry">
          <Link to="/"> HomePage</Link>
        </nav>
      </div>
    </div>
  )
}

