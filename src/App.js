import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="wrapper">
      <h1 class="app-header">3D PLAYGROUND</h1>
      <p class="app-description">
        Pick a playground and forget
        about the outside world!
      </p>
      <nav class="app-nav">
        <Link to="/Geometry">Geometry</Link> | { ""}
        <Link to="/VisualEffects">Visual Effects</Link>
      </nav>
      </div>

  );
}

export default App;
