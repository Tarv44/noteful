import React, {Component} from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import NoteContext from '../NoteContext';

class NoteList extends Component {
    static contextType = NoteContext;
    render() {
        const {folderId} = this.props.match.params
        const { notes } = this.context
        const filteredNotes = (!folderId)
            ? notes
            : notes.filter(note => note.folderId === folderId)
        const noteLis = filteredNotes.map(note => {
            return (
                <li key={note.id}>
                    <NoteListItem key={note.id} note={note} />
                </li>
            )
        })
        return (
            <div className="noteList">
                <h2>Notes</h2>
                <ul>
                    {noteLis}
                </ul>
                <button>Add note</button>
            </div>
        )
    }
}

export default NoteList;