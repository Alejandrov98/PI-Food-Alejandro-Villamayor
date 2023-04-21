import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import landingPage from './components/landingPage';
import homePage from './components/homepage';
import recipeCreator from './components/recipeCreator';
import Detail from './components/cardDetail';
import Loading from './components/Loading';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component= {landingPage}/>
        <Route path='/home' component= {homePage}/>
        <Route exact path='/recipes' component= {recipeCreator}/>
        <Route path='/recipes/:id' component= {Detail}/>
        <Route path="/loading" component={Loading} />
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
