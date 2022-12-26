import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

    const dispatch = useDispatch();

    //active:note is a rename of the property active to note
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    //this will be used to call the input file in our upload icon button, this maintain the reference to the html input
    const fileInputRef = useRef();

    useEffect(() => {
        //we send the formstate cause it has every property of the note, even the updated ones
      dispatch( setActiveNote(formState) ); 
      //when any property of the state changes, then it will be doing the dispatch
    }, [formState])

    useEffect(() => {
      if ( messageSaved.length > 0) {
        Swal.fire('Note updated', messageSaved, 'success');
      }
    
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    
  return (
     <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animate animate__fadeIn animate__faster'
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>

        <Grid item>

            <input 
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                // this simulates the click over the icon
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined sx={{ fontSize: 30 }}/>
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2}}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1}} />
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Enter a title"
                label="Title"
                sx={{  border: 'none', mb: 1}}
                name="title"
                value = { title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="What happened today?"
                minRows={ 5 }
                name="body"
                value = { body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline/>
                Delete
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls }/>

     </Grid>
  )
}
