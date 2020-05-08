import React, { Component } from 'react';
import {request} from '../../request';
import './Login.css';

export class Login extends Component {  
  state = {
      username:'',
      password:''
  }
  
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onClick = (e) => {
    request('POST', 'api/login', {username:this.state.username, password:this.state.password})
        .then((res) => {
          this.props.history.push(`/dashboard`);
        })
        .catch((err) => console.log(err));
  }

  renderRedirect = () => {
    request('GET', 'api/verify')
        .then(() => this.props.history.push(`/login`));
  }

  render() {
    this.renderRedirect();

    return (
      <div id='login'>    
        <input 
          type='text'
          name='username' 
          placeholder='username'
          value={this.state.username}
          onChange={this.onChange}
        />
        <input 
          type='password'
          name='password' 
          placeholder='password'
          value={this.state.password}
          onChange={this.onChange}
        />
        <input 
          type="button" 
          value="login"
          onClick={this.onClick} 
        />
      </div>
    );
  }
}

export default Login;
