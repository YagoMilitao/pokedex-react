import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import Pokedex from './pokedex/Pokedex';
import Routes from './routes';


const App: React.FC = () =>{
  return ( 
    <>
      <Router>
        <Routes/>
      </Router>
      
    </>
  )
}

export default App;
