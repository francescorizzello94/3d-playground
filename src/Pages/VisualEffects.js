import "./VisualEffects.css"
import { Link } from "react-router-dom"
import ExportVisual from "../Components/Visual Effects/Blobs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk'
import { faRainbow } from '@fortawesome/free-solid-svg-icons/faRainbow'
import { EarthApp } from "../Components/Visual Effects/EarthSpin/EarthSpin"
import { DarkEarthApp } from "../Components/Visual Effects/DarkSphere/DarkSphere"
import { ManyBlobsApp } from "../Components/Visual Effects/BlobsTwo"

export const VisualEffects = () => {
  return (
    <div class="wrapper-effects">
      <h1 class="header-effects">Aesthetics</h1>
      <div class="description-effects">
        Let the visions take you far away
        <br />
        <nav class="visualeffects-menu">
          <Link to="/">Home</Link>
          <a href="#firstvisual-icon"><FontAwesomeIcon icon={faAsterisk} /></a>
          <a href="#secondvisual-icon"><FontAwesomeIcon icon={faGlobe} /></a>
          <a href="#thirdvisual-icon"><FontAwesomeIcon icon={faStar} /></a>
          <a href="#fourthvisual-icon"><FontAwesomeIcon icon={faRainbow} /></a>
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
          <section id="fourthvisual-icon">
            <ManyBlobsApp />
          </section>
        </div>
      </div>
    </div>
  )
}