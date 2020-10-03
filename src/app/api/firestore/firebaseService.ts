import firebase from '../firebase';

export function signInWithEmailAndPassword(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}
