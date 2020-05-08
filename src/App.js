import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import './Colors.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect exact from="/" to="/login"/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;

//<Redirect exact from="/" to="/login"/>