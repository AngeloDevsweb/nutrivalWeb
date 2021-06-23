import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navegacion from './components/Navegacion';
import Proteinas from './components/Proteinas';
import Carbos from './components/Carbos';
import Grasas from './components/Grasas';
import Fibras from './components/Fibras';

function App() {
  return (
    <Router>
      <Navegacion/>
      <Route path="/" exact component={Proteinas} />
      <Route path="/carbohidratos" component={Carbos} />
      <Route path="/grasas" component={Grasas} />
      <Route path="/fibras" component={Fibras} />
    </Router>
  );
}

export default App;
