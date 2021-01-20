import { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './FolderList.css'

class FolderList extends Component {
    static contextType = NoteContext;
    render() {
        const folders = this.context.folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>{folder.title}</NavLink>
                </li>
            )
        })
        return (
            <>
                <h2>Folders</h2>
                <ul>
                    {folders}
                </ul>
                <Link to={'/addFolder'} className="addFolderButton">
                    Add folder
                </Link>
                             
            </>
        )
    }
}

export default FolderList;