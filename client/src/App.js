import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// pages for this product
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
