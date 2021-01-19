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
            title: {
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
        const folder = this.context.folders.find(folder => folder.title == this.state.folder.value).id
        const note = {
            title: this.state.title.value,
            folder,
            content: this.state.content.value,
        }
        console.log(note)
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch('http://localhost:9090/api/notes', options)
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
                    title: {
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

    updateTitle(title) {
        this.setState({
            title: {
                value: title,
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

    validateTitle() {
        const title = this.state.title.value.trim();
        if (title.length === 0) {
          return "Title is required";
        }
        return ''
    }

    handleCancel() {
        this.props.history.push('/')
    }

    render() {
        const folderOptions = this.context.folders.map(folder => {
            return <option key={folder.id}>{folder.title}</option>
        })
        return (
            <form classTitle="add-note" onSubmit={event => this.handleAddNoteSubmit(event)}>
                <h2>Add Note</h2>
                <label htmlFor='noteTitle'>Note Title:</label>
                <input 
                    id='noteTitle'
                    title='noteTitle' 
                    type='text'
                    onChange={e => this.updateTitle(e.target.value)}/>
                {this.state.title.touched && <ValidationError message={this.validateTitle()}/>}
                <label htmlFor='noteContent'>Note Content:</label>
                <textarea 
                    id='noteContent'
                    title='noteContent'
                    onChange={e => this.updateContent(e.target.value)}/>
                <label htmlFor='folderOptions'>Folder:</label>
                <select 
                    id='folderOptions'
                    title='folderOptions'
                    onChange={e => this.updateFolder(e.target.value)}
                    defaultValue={'Select a folder'}
                >
                    <option disabled>Select a folder</option>
                    {folderOptions}
                </select>
                <button 
                    type='submit'
                    disabled={this.validateTitle() || !this.state.folder.touched}>Add Note</button>
                <button type='cancel' onClick={() => this.handleCancel()}>Cancel</button>
            </form>
        )
    }
}