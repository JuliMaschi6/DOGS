import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import landingPage from './components/Landing/LandingPage'
import home from './components/Home/Home'

function App() {
  return (
    <React.Fragment>
        <Route exact path="/" component={landingPage} />
        <Route exact path="/home" component={home} />
    </React.Fragment>
);
}

export default App;
