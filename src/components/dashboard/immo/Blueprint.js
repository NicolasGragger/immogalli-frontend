import React, { Component } from 'react';
import './Blueprint.css';
import Expose from './Expose';
import {request} from '../../../request';



export class Blueprint extends Component {  
    state = {
        id: this.props.id ? this.props.id : null,
        title: this.props.title ? this.props.title : '',
        price: this.props.price ? this.props.price : '',
        location: this.props.location ? this.props.location : '',
        attribute1: this.props.attribute1 ? this.props.attribute1 : '',
        attribute2: this.props.attribute2 ? this.props.attribute2 : '',
        preview: null,
        previewURL: this.props.previewURL ? this.props.previewURL : null,
        expose: null,
        exposeURL: this.props.exposeURL ? this.props.exposeURL : null,

        showExpose: false,
        statusbar: null
    }

    onUpload = () => {
        if (!this.state.preview || !this.state.expose) return;

        let data = new FormData();
        
        data.append('title', this.state.title);
        data.append('price', this.state.price);
        data.append('location', this.state.location);
        data.append('attribute1', this.state.attribute1);
        data.append('attribute2', this.state.attribute2);
        data.append('preview', this.state.preview);
        data.append('expose', this.state.expose);
        
        request('POST', 'api/immo', data, (e) => {
            this.setState({statusbar: {
                width: 250 / (e.total/e.loaded) + 'px',
                transition: 'width 0.3s'
            }});
        }).then((res) => {
            setTimeout(() => this.setState({statusbar: {width: '0px'}}), 400);
            this.props.loadImmos();
        });
    } 

    onDelete = (e) => {
        if (this.state.id)
         request('DELETE', 'api/immo/' + this.state.id)
            .then(() => {
                this.props.loadImmos();
            });
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    onFileChange = (e) => {
        if(e.target.files[0])
            this.setState({
                [e.target.name]: e.target.files[0], 
                [e.target.name + 'URL']: URL.createObjectURL(e.target.files[0])
            });
    }

    render() {
        return(
            <div id='blueprint'>
                <img onClick={() => this.fileInput.click()} src={this.state.previewURL} alt=''/>
                <input type='file' name='preview' style={{display: 'none'}} accept='image/*' ref={fileInput => this.fileInput = fileInput} onChange={this.onFileChange}/>
                <input type='text' name='location' placeholder='St.Veit/Glan' maxLength="15" value={this.state.location} onChange={this.onChange}/>
                <input type='text' name='attribute1' placeholder='Mietwohnung' maxLength="25" value={this.state.attribute1} onChange={this.onChange}/>
                <input type='text' name='attribute2' placeholder='im Zentrum' maxLength="25" value={this.state.attribute2} onChange={this.onChange}/>
                <input type='text' name='price' placeholder='400€ / Monat' maxLength="13" value={this.state.price} onChange={this.onChange}/>                
                <div className='status' style={this.state.statusbar}/>
                <div className='controlbar'>
                    <svg onClick={() => this.setState({showExpose: true})} className='button'  viewBox="0 0 432 512"><path d="M368,5V99a5,5,0,0,0,5,5h94a5,5,0,0,0,3.54-8.54l-94-94A5,5,0,0,0,368,5Z" transform="translate(-40 0)"/><path d="M344,152a24,24,0,0,1-24-24V0H94A54.06,54.06,0,0,0,40,54V458a54.06,54.06,0,0,0,54,54H418a54.06,54.06,0,0,0,54-54V152Z" transform="translate(-40 0)"/></svg>
                    {this.state.id ? <svg onClick= {this.onDelete} className='button' viewBox="0 0 384 384"><g><path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z"/><polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333"/></g></svg> : null}
                    <svg onClick={this.onUpload} className='button' viewBox="0 0 24 24"><path d="m13.25 16h-2.5c-.689 0-1.25-.561-1.25-1.25v-5.75h-2.75c-.659 0-.997-.792-.542-1.268l5.25-5.5c.283-.296.802-.296 1.085 0l5.25 5.5c.454.476.116 1.268-.543 1.268h-2.75v5.75c0 .689-.561 1.25-1.25 1.25z"/><path d="m22.25 22h-20.5c-.965 0-1.75-.785-1.75-1.75v-.5c0-.965.785-1.75 1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z"/></svg>
                </div>
                <Expose parent={this}/>
            </div>
        );
    }
}

export default Blueprint;
