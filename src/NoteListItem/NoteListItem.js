import React, {Component} from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import 'moment-timezone';
import PropTypes from 'prop-types';
import './NoteListItem.css';

class NoteListItem extends Component {
    static contextType = NoteContext;

    deleteNoteRequest(noteId) {
<<<<<<< HEAD
        fetch(`https://shielded-fortress-55094.herokuapp.com/api/notes/${noteId}`, {
=======
        fetch(`http://localhost:9090/notes/${noteId}`, {
>>>>>>> parent of 2857eca (Refactored for noteful-api)
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
                            className='deleteButton'
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

NoteListItem.propTypes = {
    note: PropTypes.shape({
        name: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })
}

export default NoteListItem;