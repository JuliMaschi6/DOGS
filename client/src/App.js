import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import landingPage from './components/Landing/LandingPage'
import home from './components/Home/Home'
import navBar from './components/NavBar/navBar'
import breedDetail from './components/BreedDetail/breedDetail'
import CreateBreed from './components/CreateBreed/CreateBreed';

function App() {
  return (
    <React.Fragment>
        <Route path="/home" component={navBar}/> 
        <Route exact path="/" component={landingPage} /> 
        <Route exact path="/home" component={home} />
        <Route exact path="/home/breedDetail/:id" component={breedDetail} />
        <Route exact path="/home/create" component={CreateBreed} />
    </React.Fragment>
  );
}

export default App;
