import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {

  return (
      /* NOTES: this below is JSX (JS extension) that lets us write JS in an HTML-like way
      HTML class in JSX is className. for attribute in JSX is htmlFor
      JSX must have 1 parent element. Everything needs to be inside a single div. */
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert alert={alert}/>
              <Switch>
                <Route exact path='/' component = {Home}/>
                <Route exact path='/About' component={About}/>
                <Route exact path='/User/:login' component={User}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
