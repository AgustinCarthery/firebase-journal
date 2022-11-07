import { async } from "@firebase/util";
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote())

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    //creacion de doc en firestore
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    //inserto todcumento (referencia a donde quiero insertar y objeto)
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;
    if (!uid) throw new Error('Uid de usuario no existe')
    const notes = await loadNotes(uid)

    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving())

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    //nota de referencia para firestone
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note))

  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // await fileUpload(files[0])

    const fileUploadPromises = []

    //agrupo promesas
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const photosUrls = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  }
}