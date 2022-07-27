import './Geometry.css'
import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'

export const Geometry = () => { 
  return (
    <div className="wrapper-geometry">
      <h1 className="geometry-header">Geometry</h1>
      <div className="description-geometry">
        Explore the realm of geometry
        <br />
        <nav className="return-geometry">
          <Link to="/"> HomePage</Link>
        </nav>
        <nav className="geometry-menu">
          <a href=".cube"><FontAwesomeIcon icon={faArrowCircleRight } /></a>
          <a href=".sphere"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
        </nav>
      </div>
    </div>
  )
}

