import React, { Component } from 'react'
import NotePageNav from '../NotePageNav/NotePageNav';
import PropTypes from 'prop-types';

export default class AddNote extends Component {

    static propTypes = {
        addNote: PropTypes.func.isRequired
    };

    constructor(props) {
        const ipsum = require('gen-ipsum');

        super(props);
        this.state = {
            errors: "",
            noteName: ``,
            noteContent: "",
            selectedFolder: "",
            ipsum: ipsum.generate({words: 50})
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ noteName: event.target.value });
    }

    handleNoteChange(event) {
        this.setState({ noteContent: event.target.value });
    }

    handleSelect(event) {
        this.setState({selectedFolder: event.target.value});
    }

    handleSubmit = (event) => {

        event.preventDefault();

        const url = 'https://immense-caverns-47913.herokuapp.com/notes';
        const data = { notename: this.state.noteName, notecontent: this.state.noteContent, folderid: this.state.selectedFolder}
        if (!data.notecontent) {
            data.notecontent = this.state.ipsum
        }
        if(!data.folderid){
            data.folderid = 1
        }
        if (!data.notename){
            this.setState({ errors: "Note name field cannot be blank" })
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
        const folders = this.props.folders.map((folder, index) => { 
            return  <option key={index} value={folder.folderId}>{folder.folderName}</option>
        })

        return (
            <div>
                <NotePageNav {...this.props} />
                <form onSubmit = {this.handleSubmit}>
                    <div>
                    <label>Enter note name:
                        <input type="text" name="newNote" value={this.state.noteName} onChange={this.handleNameChange} />
                    </label>
                    </div>
                    <div>
                    <label>Enter note:
                        <textarea className="note__text" type="text" name="noteContent" placeholder={this.state.ipsum} value={this.state.noteContent} onChange={this.handleNoteChange} />
                    </label>
                    </div>
                    <select onChange={this.handleSelect} value={this.state.selectedFolder}>
                        {folders}
                    </select>
                    <input type="submit" value="Submit" />
                    {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                </form>
                
            </div>
        )
    }
}
