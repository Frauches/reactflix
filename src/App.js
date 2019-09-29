import React from 'react'
import Header from './containers/Header/Header';
import Genres from './containers/Genres/Genres';
import Series from './containers/Series/Series';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import RegisterGenre from './containers/RegisterGenre/RegisterGenre';
import EditGenre from './containers/EditGenre/EditGenre';
import RegisterSerie from './containers/RegisterSerie/RegisterSerie';


const Home = () => { return (<h1>Home</h1>) };

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route component={Home} exact path='/' />
          <Route component={Genres} exact path='/genres' />
          <Route component={RegisterGenre} exact path='/genres/new' />
          <Route component={EditGenre} exact path='/genres/:id' />
          <Route component={Series} exact path='/series' />
          <Route component={RegisterSerie} exact path='/series/new' />
        </Switch>
      </Router>
    </div>
  );
}
export default App;