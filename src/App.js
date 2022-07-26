import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="wrapper">
      <h1>3D Playground</h1>
      <p>
        Pick a playground and forget
        about the outside world!
      </p>
      <nav>
        <Link to="/Geometry">Geometry</Link> | { " "}
        <Link to="/VisualEffects">Visual Effects</Link>
      </nav>
      </div>

  );
}

export default App;
