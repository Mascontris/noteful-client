import React, { Component } from 'react' 
import { Link, Redirect } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default class Note extends Component {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       redirect: false,
  //   }};

  handleClick = (event) => {
    event.preventDefault();
    const url = `https://immense-caverns-47913.herokuapp.com/notes/${this.props.id}`;
    fetch(url, {
        method: 'DELETE', // or 'PUT'
    })
    .then( () => {
      window.location="/"})
    .catch(error => console.error('Error:', error)); 
}

render() {
  return (
    <div className='Note'>
      {/*this.state.redirect && <Redirect to={{pathname: "/", state: {loadData: true} }}/>*/}
      <h2 className='Note__title'>
        <Link to={`/notes/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
          <button className='Note__delete' type='button' onClick = {this.handleClick}>
          <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}