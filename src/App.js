import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './Pages/HomePage';
import { Geometry } from './Pages/Geometry';
import { VisualEffects } from './Pages/VisualEffects';

function App() {
  return (
    <BrowserRouter>
    <div className="wrapper">
      <h1>3D Playground</h1>
      <p>
        Pick a playground and forget
        about the outside world!
      </p>
      </div>
      <Route path='/' component={ Home} />
      <Route path='/Geometry' component={ Geometry} />
      <Route path='/VisualEffects' component={ VisualEffects} />
    </BrowserRouter>
  );
}

export default App;
