import React, { Component } from 'react'
import NotePageNav from '../NotePageNav/NotePageNav';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';

export default class AddNote extends Component {
    
    static propTypes = {
        addNote: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            value: ``
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {

        event.preventDefault();

        const ipsum = require('gen-ipsum'); // run "npm install gen-ipsum" to install React component
        const url = 'http://localhost:9090/notes';
        const data = { name: this.state.value, modified: new Date(), content: ipsum.generate({words: 30}), }
        if(this.props.folderId ){
            data.folderId = this.props.folderId
        }
        if (!data.name){
            this.setState({ errors: "field cannot be blank" })
        }
        else {
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                this.props.addNote(response)
                this.props.history.push('/')
            })
            .catch(error => console.error('Error:', error));

        
        }
    }
    render() {
        return (
            <div>
                <NotePageNav {...this.props} />
                <form onSubmit = {this.handleSubmit}>
                    <label>Enter Note Name:
                    <input type="text" name="newNote" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                </form>
                <Dropdown folders={this.props}></Dropdown>
            </div>
        )
    }
}
