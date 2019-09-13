import React from 'react'
import Header from './containers/Header/Header';
import Genres from './containers/Genres/Genres';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import RegisterGenre from './containers/RegisterGenre/RegisterGenre';

const Home = () => { return (<h1>Home</h1>) };

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Route component={Home} exact path='/' />
        <Route component={Genres} exact path='/genres' />
        <Route component={RegisterGenre} exact path='/genres/new' />
      </Router>
    </div>
  );
}

export default App;

