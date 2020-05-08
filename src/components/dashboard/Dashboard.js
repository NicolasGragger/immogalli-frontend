import React, { Component } from 'react';
import {request} from '../../request';
import Navbar from './Navbar'
import Immo from './immo/Immo'


export class Login extends Component {  
    componentDidMount() {
        request('GET', 'api/verify')
            .catch(() => this.props.history.push(`/login`));
    }

    render() {
        return(
            <div>
                <Navbar/>
                <Immo/>
            </div>
        );
    }
}

export default Login;
