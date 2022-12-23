import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid = '') => {
    if ( !uid ) throw new Error('User UID does not exist');

    //Here is mandatory to point to a collection
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
    //bring the docs from that collection
    const docs = await getDocs(collectionRef);

    //call the data inside each document
    const notes = [];
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() });
    })

    return notes;

}