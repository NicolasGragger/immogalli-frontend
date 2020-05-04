import React, { Component } from 'react';
import './Immo.css';
import Blueprint from './Blueprint';
import {request, endpoint} from '../../../request';


export class Immo extends Component {  
    state = {
        immos: null 
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    loadImmos = () => {
        request('GET', 'api/immo').then(res => {
            this.setState({immos: res.immos});
        }).catch(err => {
            console.log(err);
        });
    }

    renderImmos = () => {
        if(!this.state.immos) return this.loadImmos();

        return this.state.immos.map(immo => (
            <Blueprint 
                loadImmos={this.loadImmos}
                key={immo._id} 
                id={immo._id} 
                title={immo.title} 
                price={immo.price} 
                location={immo.location} 
                attribute1={immo.attribute1} 
                attribute2={immo.attribute2} 
                previewURL={endpoint + immo.preview} 
                exposeURL={endpoint + immo.expose}
            />
        ));
    }


    render() {
        return(
            <div id='immo'>
                <Blueprint loadImmos={this.loadImmos}/>
                {this.renderImmos()}
            </div>
        );
    }
}

export default Immo;
