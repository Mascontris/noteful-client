import React, { Component } from 'react'
import NotePageNav from '../NotePageNav/NotePageNav';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {

    static propTypes = {
        addFolder: PropTypes.func.isRequired
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

    handleSubmit(event) {
        event.preventDefault();
        var url = 'https://immense-caverns-47913.herokuapp.com/folders';
        var data = { folderName: this.state.value }

        if(this.props.folderId ){
            data.folderId = this.props.folderId
        }
        if (!data.folderName){
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
                this.props.addFolder(response)
                this.props.history.push('/')
            })
            .catch(error => console.error('Error:', error));

        }
    }
    render() {
        return (
            <div>
                <NotePageNav {...this.props} />
                <form onSubmit={this.handleSubmit}>
                    <label>Folder Name:
                    <input type="text" name="newFolder" value={this.state.value} onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Submit" />
                    {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                </form>
            </div>
        )
    }
}