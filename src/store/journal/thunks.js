import { async } from "@firebase/util"

export const startNewNote = () => {
    return async( dispatch ) => {
        //to save in firebase Im gonna use the uid

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //dispatch
        //dispatch( newNote )
        //dispatch( activarNote )
    }
}