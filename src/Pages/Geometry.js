import './Geometry.css'
import BoxApp from '../Components/Geometry/BoxApp'
import NintendoCube from '../Components/Geometry/NintendoCube'
import MorphingBoxes from '../Components/Geometry/InteractiveRect'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube'
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons/faObjectGroup'
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons/faSnowflake'
import { faRodSnake } from '@fortawesome/free-solid-svg-icons/faRodSnake'
import { faShapes } from '@fortawesome/free-solid-svg-icons/faShapes'
import ManipulateSingleCubeApp from '../Components/Geometry/ManipulateCube'
import TorusKnot from '../Components/Geometry/TorusKnot'
import PhysicsApp from '../Components/Geometry/Physics'

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
          <a href="#geo-cube-icon"><FontAwesomeIcon icon={faCube} /></a>
          <a href="#geo-twocube-icon"><FontAwesomeIcon icon={faObjectGroup} /></a>
          <a href="#geo-controlrect-icon"><FontAwesomeIcon icon={faSliders} /></a>
          <a href="#geo-controlsinglerect-icon"><FontAwesomeIcon icon={faSnowflake} /></a>
          <a href="#geo-twocubesapp-icon"><FontAwesomeIcon icon={faRodSnake} /></a>
          <a href="#geo-physicsapp-icon"><FontAwesomeIcon icon={faShapes} /></a>
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
            <MorphingBoxes />
          </section>
          <section id="geo-twocubesapp-icon">
            <TorusKnot />
          </section>
          <section id="geo-physicsapp-icon">
            <PhysicsApp />
          </section>
        </div>
      </div>
    </div>
  )
}

