import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import FolderList from './FolderList/FolderList';
import NotePage from './NotePage/NotePage';
import NoteContext from './NoteContext';
import NotePageNavigation from './NotePageNavigation/NotePageNavigation';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NavError from './NavError';
import MainError from './MainError';
import FormNavigation from './FormNavigation/FormNavigation';

import './App.css'


class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  

  componentDidMount() {
    fetch('https://shielded-fortress-55094.herokuapp.com/api/folders/')
      .then(res => {
        if (!res.ok){
          return res.json().then(error => {throw error})
        } 
        return res.json()
      })
      .then(res => {
        this.setState({
          folders: res
        })
      })
      .catch(err => console.log('Error on folder request.'))
    
    fetch('https://shielded-fortress-55094.herokuapp.com/api/notes/')
      .then(res => {
        if (!res.ok){
          return res.json().then(error => {throw error})
        } 
        return res.json()
      })
      .then(res => {
        this.setState({
          notes: res
        })
      })
      .catch(err => console.log('Error on note request.'))
    
  }

  handleDeleteNote = (noteId) => {
    const notes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes
    })
  }

  handleAddFolder = (newFolder) => {
    this.setState({
      folders: [
        ...this.state.folders, 
        newFolder
      ]
    })
  }

  handleAddNote = (newNote) => {
    this.setState({
      notes: [
        ...this.state.notes,
        newNote
      ]
    })
  }
  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder
    }
    return (
      <NoteContext.Provider value={contextValue}>  
        <div className="App">
          <header>
            <Link to='/'>
              <h1>Noteful</h1>
            </Link>
          </header>
          <NavError>
            <nav className="sidebar">
              <Switch>
                {/* Note Page */}
                <Route 
                  path='/note/:noteId' 
                  component={NotePageNavigation}  
                  />
                <Route 
                  exact path='/addFolder'
                  component={FormNavigation}/>
                <Route 
                  exact path='/addNote'
                  component={FormNavigation}/>
                {/* Note Lists */}
                <Route 
                  path='/'
                  component={FolderList} />
              </Switch>
            </nav>
          </NavError>
          
          <MainError>
            <main>
              {/* All Notes List */}
              <Route 
                exact path='/'
                component={NoteList}
                />
              {/* Folder Notes List */}
              <Route 
                exact path='/folder/:folderId'
                component={NoteList}
                />
              {/* Note Page */}
              <Route 
                exact path='/note/:noteId'
                component={NotePage}/>
              {/* Add Folder */}
              <Route 
                exact path='/addFolder'
                component={AddFolder}/>
              {/* Add Note */}
              <Route 
                exact path='/addNote'
                component={AddNote}/>
            </main>
          </MainError>
          
        </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
