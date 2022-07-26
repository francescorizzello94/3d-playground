import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

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
      <Route path='/' component={ } />
      <Route path='/Geometry' component={ } />
      <Route path='/VisualEffects' component={ } />
    </BrowserRouter>
  );
}

export default App;
