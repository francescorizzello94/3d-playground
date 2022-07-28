import "./VisualEffects.css"
import { Link } from "react-router-dom"
import ExportVisual from "../Components/Visual Effects/Blobs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'
import { EarthApp } from "../Components/Visual Effects/EarthSpin/EarthSpin"
import { DarkEarthApp } from "../Components/Visual Effects/DarkSphere/DarkSphere"

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
        <div className="geometry-icons-wrapper">
          <section id="firstvisual-icon">
            < ExportVisual />
          </section>
          <section id="secondvisual-icon">
            < EarthApp />
          </section>
          <section id="thirdvisual-icon">
            <DarkEarthApp />
          </section>
        </div>
      </div>
    </div>
  )
}