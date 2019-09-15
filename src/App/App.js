import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import ErrorBoundary from '../Error'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        //setTimeout(() => this.setState(dummyStore), 600);
        fetch('http://localhost:9090/folders').then(res => res.json())
        .then(response => this.setState({folders: response}))
        .catch(error => console.error('Error:', error))
        fetch('http://localhost:9090/notes').then(res => res.json())
        .then(response => this.setState({notes: response}))
        .catch(error => console.error('Error:', error))
    }

    addFolder = (folder) => {this.setState({folders: [...this.state.folders, folder]})}
    addNote = (note) => {this.setState({notes: [...this.state.notes, note]})}

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" 
                    render={routeProps => {
                    return <AddFolder {...routeProps} addFolder={this.addFolder} />}} />
            </>
        );
    }

    renderMainRoutes() {
        // eslint-disable-next-line
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
                <Route path="/add-note" 
                    render={routeProps => {
                    return <AddNote {...routeProps} addNote={this.addNote} folderId={routeProps.match.params.folderId} folders={this.state.folders}/>}} />
            </>
        );
    }

    render() {
        return (
            <ErrorBoundary>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </ErrorBoundary>
        );
    }
}

export default App;
