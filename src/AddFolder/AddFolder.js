import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import { v4 as uniqueId } from 'uuid';
import ValidationError from '../ValidationError';

export default class AddFolder extends Component {
    static contextType = NoteContext;

    constructor(props) {
        super(props)
        this.state ={
            name: {
                value: '',
                touched: false
            }
        }
    }

    handleAddFolderSubmit(event) {
        event.preventDefault();
        const folder = {
            id: uniqueId(),
            name: this.state.name.value
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                "Content-Type": "application/json"
            }
        }

<<<<<<< HEAD
        fetch('https://shielded-fortress-55094.herokuapp.com/api/folders', options)
=======
        fetch('http://localhost:9090/folders', options)
>>>>>>> parent of 2857eca (Refactored for noteful-api)
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    name: {
                        value: '',
                        touched: false
                    }
                })
                this.context.addFolder(folder);
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    updateName(name) {
        this.setState({ name: {value: name, touched: true} })
    }

    validateName() {
        if(this.state.name.value.length === 0) {
            return 'Name is required'
        }
        return ''
    }

    handleCancel() {
        this.props.history.push('/')
    }

    render() {
        return (
            <form className='addFolder' onSubmit={event => this.handleAddFolderSubmit(event)}>
                <h2>Add Folder</h2>
                <label htmlFor='folderName'>New Folder Name:</label>
                <input 
                    name='folderName' 
                    id='folderName' 
                    className='form__folderName'
                    onChange={e => this.updateName(e.target.value)}/>
                <ValidationError message={this.validateName()}/>
                <button type='submit' disabled={this.validateName()}>Add Folder</button>
                <button onClick={() => this.handleCancel}>Cancel</button>

            </form>
        )
    }
}