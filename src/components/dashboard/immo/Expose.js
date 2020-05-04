import React, { Component } from 'react';
import './Expose.css';


export class Expose extends Component {  
    state = {
        title: this.props.parent.state.title,
        expose: this.props.parent.state.expose,
        exposeURL: this.props.parent.state.exposeURL
    }

    onClose = () => {
        this.props.parent.setState({
            showExpose: false, 
            title: this.state.title, 
            expose: this.state.expose, 
            exposeURL: this.state.exposeURL
        });
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onFileChange = (e) => {
        if(e.target.files[0]){
            this.setState({[e.target.name]: e.target.files[0], [e.target.name + 'URL']: URL.createObjectURL(e.target.files[0])});
        }
    }

    render() { 
        if(!this.props.parent.state.showExpose) return null;
        
        return(
            <div id='expose'>
                <div className='background' onClick={this.onClose}/>
                <div className='content'>
                    <input type='text' name='title' placeholder='Titel' maxLength="20" value={this.state.title} onChange={this.onChange}/>
                    <svg className='add' onClick={() => this.fileInput.click()} viewBox="0 0 512 512"><path d="m368 5.01v93.99c0 2.761 2.239 5 5 5h93.99c4.454 0 6.685-5.386 3.536-8.536l-93.99-93.99c-3.15-3.149-8.536-.919-8.536 3.536z"/><path d="m344 152c-13.255 0-24-10.745-24-24v-128h-226c-29.775 0-54 24.224-54 54v404c0 29.776 24.225 54 54 54h324c29.775 0 54-24.224 54-54v-306zm-24 128h-40v40c0 13.255-10.745 24-24 24s-24-10.745-24-24v-40h-40c-13.255 0-24-10.745-24-24s10.745-24 24-24h40v-40c0-13.255 10.745-24 24-24s24 10.745 24 24v40h40c13.255 0 24 10.745 24 24s-10.745 24-24 24z"/></svg>
                    <svg className='close' onClick={this.onClose} viewBox="0 0 329.26933 329"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                    
                    <input type='file' name='expose' style={{display: 'none'}} accept='.pdf' ref={fileInput => this.fileInput = fileInput} onChange={this.onFileChange}/>
                    {this.state.exposeURL ? <embed src={this.state.exposeURL}/> : null}
                </div>
            </div>
        );
    }
}

export default Expose;
