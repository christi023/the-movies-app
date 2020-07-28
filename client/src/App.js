import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// pages for this product
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import MovieDetail from './Components/MovieDetail/MovieDetails';
//import Movie from './Components/Movie';
import FavoritePage from './Components/FavoritePage/FavoritePage';
import './App.css';
//styles
import Particles from 'react-particles-js';

import './App.css';
const ParticleParams = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
      size: {
        value: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  },
};

function App() {
  return (
    <>
      <Particles className="particles" params={ParticleParams} />
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
            <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
            <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
