import React from 'react';
import Header from './containers/Header';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const Home = () => { return (<h1>Home</h1>) };
const Genres = () => { return (<h1>Genres</h1>) };

function App() {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <Route component={Home} exact path='/' />
        <Route component={Genres} path='/genres' />
      </Router>
    </div>
  );
}

export default App;

