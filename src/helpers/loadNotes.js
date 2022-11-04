import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('Uid de usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef)

  const notes = []
  docs.forEach(doc => {
    //saco id y utilizo metodo data() para evitar datos innecesarios
    notes.push({ id: doc.id, ...doc.data() })
  });

  return notes;
}