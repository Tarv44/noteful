import React, {Component} from 'react';
import NoteContext from '../NoteContext';
import ValidationError from '../ValidationError';

export default class AddFolder extends Component {
    static contextType = NoteContext;

    constructor(props) {
        super(props)
        this.state ={
            title: {
                value: '',
                touched: false
            }
        }
    }

    handleAddFolderSubmit(event) {
        event.preventDefault();
        const folder = {
            title: this.state.title.value
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch('https://shielded-fortress-55094.herokuapp.com/api/folders', options)
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
                    title: {
                        value: '',
                        touched: false
                    }
                })
                this.context.addFolder(res);
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    updateTitle(title) {
        this.setState({ title: {value: title, touched: true} })
    }

    validateTitle() {
        if(this.state.title.value.length === 0) {
            return 'Title is required'
        }
        return ''
    }

    handleCancel() {
        this.props.history.push('/')
    }

    render() {
        return (
            <form classTitle='addFolder' onSubmit={event => this.handleAddFolderSubmit(event)}>
                <h2>Add Folder</h2>
                <label htmlFor='folderTitle'>New Folder Title:</label>
                <input 
                    title='folderTitle' 
                    id='folderTitle' 
                    classTitle='form__folderTitle'
                    onChange={e => this.updateTitle(e.target.value)}/>
                <ValidationError message={this.validateTitle()}/>
                <button type='submit' disabled={this.validateTitle()}>Add Folder</button>
                <button onClick={() => this.handleCancel}>Cancel</button>

            </form>
        )
    }
}