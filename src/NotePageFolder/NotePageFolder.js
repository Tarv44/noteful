import React from 'react';
import {Link} from 'react-router-dom';
import NotesContext from '../NoteContext';



export default class NotePageFolder extends React.Component {
    static contextType = NotesContext;
    // const folderId = store.notes.find(note => note.id === props.match.params.noteId).folderId
    // const folderName = store.folders.find(folder => folder.id === folderId).name
    render() {
        const folderName = 'Test'
        return (
            <div>
              <Link to='/'>Go Back</Link>
              <h3>{folderName}</h3>
            </div>
          )
    }
    
}