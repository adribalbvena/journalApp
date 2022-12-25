import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'abc123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: [],
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;

        },
        setSaving: ( state ) => {
            state.isSaving = true;

        },
        updateNote: ( state, action ) => { //payload: note
            //update the local reference
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, updated successfully!`

            //Show updated message

        },
        deleteNoteById: ( state, action ) => {

        },
    }
});


export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById 
 } = journalSlice.actions;
