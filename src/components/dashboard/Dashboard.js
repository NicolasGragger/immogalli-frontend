import React, { Component } from 'react';
import {request} from '../../request';
import Navbar from './Navbar'
import Immo from './immo/Immo'


export class Login extends Component {  
    renderRedirect = () => {
        request('GET', 'api/verify')
            .catch((err) => this.props.history.push(`/login`));
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
