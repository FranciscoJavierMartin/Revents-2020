import firebase from '../firebase';
import { setUserProfileData } from './firestoreService';

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
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(selectedProvider: string){
  let provider: firebase.auth.FacebookAuthProvider | firebase.auth.GoogleAuthProvider;

  if(selectedProvider === 'facebook'){
    provider = new firebase.auth.FacebookAuthProvider();
  } else if(selectedProvider === 'google'){
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider!!);
    if(result.additionalUserInfo?.isNewUser){
      await setUserProfileData(result.user);
    }
  } catch(error){

  }
}