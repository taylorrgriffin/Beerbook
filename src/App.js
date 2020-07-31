import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

import { Home } from './Home/Home';
import { Beer } from './Beer/Beer';
import { Hops } from './Hops/Hops';
import { Search } from './Search/Search';
import { Random } from './Random/Random';
import { NavBar } from './Common/NavBar';
import BeerDetail from './Beer/BeerDetail';
import HopsDetail from './Hops/HopsDetail';

function App() {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path="/beer/:beerId">
          <BeerDetail/>
        </Route>
        <Route path="/beer">
          <Beer/>
        </Route>
        <Route path="/hops/:hopsId">
          <HopsDetail/>
        </Route>
        <Route path="/hops">
          <Hops/>
        </Route>
        <Route path="/random">
          <Random/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
