import firebase from '../firebase';

export function signInWithEmailAndPassword(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
