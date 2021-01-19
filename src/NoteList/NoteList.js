import React, {Component} from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';
import './NoteList.css'

class NoteList extends Component {
    static contextType = NoteContext;

    handleDeleteNote = noteId => {
        this.props.history.push(`/`)
    }

    render() {
        const {folderId} = this.props.match.params
        const { notes } = this.context
        const filteredNotes = (!folderId)
            ? notes
            : notes.filter(note => note.folder == folderId)
        const noteLis = filteredNotes.map(note => {
            return (
                <li key={note.id}>
                    <NoteListItem key={note.id} note={note} onDeleteNote={this.handleDeleteNote} />
                </li>
            )
        })
        return (
            <div className="noteList">
                <h2>Notes</h2>
                <ul>
                    {noteLis}
                </ul>
                <Link to={'/addNote'} className="addNoteButton">
                    Add note
                </Link>
            </div>
        )
    }
}

export default NoteList;