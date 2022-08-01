import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Geometry} from './Pages/Geometry';
import { VisualEffects } from './Pages/VisualEffects';
import { GameApp } from './Components/Game/GameApp';
import { ParticleApp } from './Components/Particles/Particles';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Geometry' element={<Geometry />} />
        <Route path='/Aesthetics' element={<VisualEffects />} />
        <Route path='/Game' element={<GameApp />} />
        <Route path='/MeditationField' element={<ParticleApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
