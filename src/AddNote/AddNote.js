import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import { v4 as uniqueId } from 'uuid';
import ValidationError from '../ValidationError';
import './AddNote.css'

export default class AddNote extends Component {
    static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state ={
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            }
        }
    }

    handleAddNoteSubmit(event) {
        event.preventDefault();
        const folderId = this.context.folders.find(folder => folder.name === this.state.folder.value).id
        const modifiedDate = new Date()
        const note = {
            id: uniqueId(),
            name: this.state.name.value,
            modified: modifiedDate.toISOString(),
            folderId,
            content: this.state.content.value,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        }
<<<<<<< HEAD
        fetch('https://shielded-fortress-55094.herokuapp.com/api/notes', options)
=======
        fetch('http://localhost:9090/notes', options)
>>>>>>> parent of 2857eca (Refactored for noteful-api)
            .then(res => {
                if(!res.ok) {
                    return res.json().then(err => {
                        throw err
                    })
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    name: {
                        value: '',
                        touched: false
                    },
                    content: {
                        value: '',
                        touched: false
                    },
                    folder: {
                        value: '',
                        touched: false
                    }
                })
                this.context.addNote(note)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true
            }
        })
    }

    updateFolder(folder) {
        this.setState({
            folder: {
                value: folder,
                touched: true
            }
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        }
        return ''
    }

    handleCancel() {
        this.props.history.push('/')
    }

    render() {
        const folderOptions = this.context.folders.map(folder => {
            return <option key={folder.id}>{folder.name}</option>
        })
        return (
            <form className="add-note" onSubmit={event => this.handleAddNoteSubmit(event)}>
                <h2>Add Note</h2>
                <label htmlFor='noteName'>Note Name:</label>
                <input 
                    id='noteName'
                    name='noteName' 
                    type='text'
                    onChange={e => this.updateName(e.target.value)}/>
                {this.state.name.touched && <ValidationError message={this.validateName()}/>}
                <label htmlFor='noteContent'>Note Content:</label>
                <textarea 
                    id='noteContent'
                    name='noteContent'
                    onChange={e => this.updateContent(e.target.value)}/>
                <label htmlFor='folderOptions'>Folder:</label>
                <select 
                    id='folderOptions'
                    name='folderOptions'
                    onChange={e => this.updateFolder(e.target.value)}
                    defaultValue={'Select a folder'}
                >
                    <option disabled>Select a folder</option>
                    {folderOptions}
                </select>
                <button 
                    type='submit'
                    disabled={this.validateName() || !this.state.folder.touched}>Add Note</button>
                <button type='cancel' onClick={() => this.handleCancel()}>Cancel</button>
            </form>
        )
    }
}