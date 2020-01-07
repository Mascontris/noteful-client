import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class DeleteNote extends Component {

    static propTypes = {
        deleteNote: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            redirect: false,
            selectedNote: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = (event) => {
        event.preventDefault();

        const url = `https://immense-caverns-47913.herokuapp.com/notes/${props.id}`;

        fetch(url, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .then(response => {
                this.props.DeleteNote(response)
                this.props.history.push('/')
            })
            .catch(error => console.error('Error:', error));
    }
    
    render() {
        <Redirect to = "/" />
    }
}