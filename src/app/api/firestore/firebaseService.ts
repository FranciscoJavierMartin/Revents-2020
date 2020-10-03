import firebase from '../firebase';

export function signInWithEmailAndPassword(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function registerUserInFirebase(user: any) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    await result.user?.updateProfile({
      displayName: user.displayName,
    });
  } catch (error) {
    throw error;
  }
}
