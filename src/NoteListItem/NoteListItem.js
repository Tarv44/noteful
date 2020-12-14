import React, {Component} from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import 'moment-timezone';

class NoteListItem extends Component {
    static contextType = NoteContext;

    deleteNoteRequest(noteId) {
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(res => {
                
                this.props.onDeleteNote(noteId)
                this.context.deleteNote(noteId)
            })
            .catch(err => console.log(err))
    }
    
    render() {
        const note = this.props.note
        return (
            <NoteContext.Consumer>
                {(context) => (
                    <div className="note">
                        <Link to={`/note/${note.id}`}><h3>{note.name}</h3></Link>
                        <p>Last modified on <Moment format="YYYY/MM/DD">{note.modified}</Moment></p>
                        <button
                            onClick={() => {
                                this.deleteNoteRequest(note.id)
                            }}>
                            Delete
                        </button>
                    </div>
                )}
            </NoteContext.Consumer>
            
            
        )
    }
}

export default NoteListItem;