import React, { Component } from 'react';

export default class Dropdown extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    
    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {

        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
      }
    }


    render () {
        console.log(this.props.folders.folders)
        return (
            <div>
              <button onClick={this.showMenu}>
                Select Folder
              </button>
              
              {
                this.state.showMenu ? (
                    <div className="Dropdown__menu" ref={(element) => {
                        this.dropdownMenu = element;
                    }}>
            </div>
                  ) : (null)
              }
            </div>
          );
        }
      }