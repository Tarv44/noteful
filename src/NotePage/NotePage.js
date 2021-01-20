import React, {Component} from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import NoteContext from '../NoteContext';

class NotePage extends Component {
    static contextType = NoteContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
        return (
            <div className='notePage'>
                <NoteListItem onDeleteNote={this.handleDeleteNote} note={note}/>
                <p>{note.content}</p>
            </div>            
        )
    }
}

export default NotePage;