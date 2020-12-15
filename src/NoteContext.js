import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {}
})

export default NotesContext;