import "./VisualEffects.css"
import { Canvas } from "@react-three/fiber"
import App from "../App"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'

export const VisualEffects = () => {
  return (
    <div class="wrapper-effects">
      <h1 class="header-effects">Visual Effects</h1>
      <div class="description-effects">
        Let the visions take you far away
        <br />
        <nav class="visualeffects-menu">
          <Link to="/">Home</Link>
          <a href="#firstvisual-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#secondvisual-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#thirdvisual-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
        </nav>
      </div>
    </div>
  )
}