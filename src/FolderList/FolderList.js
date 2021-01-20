import { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import './FolderList.css'

class FolderList extends Component {
    static contextType = NoteContext;
    render() {
        const folders = this.context.folders.map(folder => {
            let noteCount =  0
            this.context.notes.forEach(note => {
                if(note.folder === folder.id){
                    noteCount++
                }
            })
            return (
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>{folder.title}</NavLink>
                    <p>Total Notes: {noteCount}</p>
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