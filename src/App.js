import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import PlayerProfile from './components/PlayerProfile'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Route exact strict path="/login">
            <Login />
          </Route>
          <Route exact strict path="/signup">
            <Signup />
          </Route>
          <Route exact strict path="/home">
            <Home />
          </Route>
          <Route exact strict path="/profile">
            <Profile />
          </Route>
          <Route path="/player/:id" component={PlayerProfile}/>
        </Router>
      </div>
    );
  }
}

export default App;
