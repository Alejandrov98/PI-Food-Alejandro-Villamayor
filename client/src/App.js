import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import landingPage from './components/landingPage';
import homePage from './components/homepage'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component= {landingPage}/>
        <Route path='/home' component= {homePage}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
