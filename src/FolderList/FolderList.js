import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './FolderList.css'

class FolderList extends Component {
    static contextType = NoteContext;
    render() {
        const folders = this.context.folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>{folder.name}</NavLink>
                </li>
            )
        })
        return (
            <div>
                <h2>Folders</h2>
                <ul>
                    {folders}
                </ul>
                <button>Add folder</button>              
            </div>
        )
    }
}

export default FolderList;