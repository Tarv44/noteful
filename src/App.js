import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import NoteList from './NoteList/NoteList';
import FolderList from './FolderList/FolderList';
import NotePage from './NotePage/NotePage';
import NoteContext from './NoteContext';
import NotePageFolder from './NotePageFolder/NotePageFolder';


class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  handleDeleteNote = (noteId) => {
    const notes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes
    })
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
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
    
    fetch('http://localhost:9090/notes')
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
  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote
    }
    return (
      <NoteContext.Provider value={contextValue}>  
        <div className="App">
          <header>
            <Link to='/'>
              <h1>Noteful</h1>
            </Link>
          </header>
          
          <nav className="sidebar">
            <Switch>
              {/* Note Page */}
              <Route 
                path='/note/:noteId' 
                component={NotePageFolder}  
                />
              {/* Note Lists */}
              <Route 
                path='/'
                component={FolderList} />
            </Switch>
          </nav>
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
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
