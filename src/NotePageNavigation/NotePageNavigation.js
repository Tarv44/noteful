import React from 'react';
import {Link} from 'react-router-dom';
import NotesContext from '../NoteContext';
import './NotePageNavigation.css';



export default class NotePageNavigation extends React.Component {
    static contextType = NotesContext;
    
    render() {
        // const folderId = this.context.notes.find(note => note.id == this.props.match.params.noteId).folder
        // const folderName = this.context.folders.find(folder => folder.id == folderId).title
        return (
            <>
              <h3>Test</h3>
              <Link to='/' className="goBack">Go Back</Link>
            </>
          )
    }
    
}