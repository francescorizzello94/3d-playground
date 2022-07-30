import './Geometry.css'
import BoxApp from '../Components/Geometry/BoxApp'
import NintendoCube from '../Components/Geometry/NintendoCube'
import ThreeInteractiveBoxes from '../Components/Geometry/InteractiveRect'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight'
import ManipulateSingleCubeApp from '../Components/Geometry/ManipulateCube'
// import TwoCubesApp from '../Components/Geometry/TwoCubeControl'

export const Geometry = () => {
  return (
    <div className="wrapper-geometry">
      <h1 className="geometry-header">Geometry</h1>
      <div className="description-geometry">
        Explore the realm of geometry
        <br />
        <nav className="return-geometry">

        </nav>
        <nav className="geometry-menu">
          <Link to="/">Home</Link>
          <a href="#geo-cube-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#geo-twocube-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#geo-controlrect-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#geo-controlsinglerect-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
          <a href="#geo-twocubesapp-icon"><FontAwesomeIcon icon={faArrowCircleRight} /></a>
        </nav>
        <div className="geometry-icons-wrapper">
          <section id="geo-cube-icon">
            <NintendoCube />
          </section>
          <section id="geo-twocube-icon">
            <BoxApp />
          </section>
          <section id="geo-controlrect-icon">
            <ManipulateSingleCubeApp />
          </section>
          <section id="geo-controlsinglerect-icon">
            <ThreeInteractiveBoxes />
          </section>
        </div>
      </div>
    </div>
  )
}

