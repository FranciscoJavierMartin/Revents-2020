import {
  EVENTS_COLLECTION_NAME,
  PHOTOS_COLLECTION_NAME,
  USERS_COLLECTION_NAME,
} from '../../common/constants/firebase';
import { IAttendant, IEvent, IPhoto } from '../../common/interfaces/models';
import firebase from '../firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot: any) {
  let res;
  if (!snapshot.exists) {
    res = undefined;
  } else {
    const data = snapshot.data();

    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (data[prop] instanceof firebase.firestore.Timestamp) {
          data[prop] = data[prop].toDate();
        }
      }
    }

    res = {
      ...data,
      id: snapshot.id,
    };
  }

  return res;
}

export function listenToEventsFromFirestore() {
  return db.collection(EVENTS_COLLECTION_NAME).orderBy('date');
}

export function listenToEventFromFirestore(eventId: string | undefined) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(eventId);
}

export function addEventToFirestore(event: IEvent) {
  const user = firebase.auth().currentUser;

  return db.collection(EVENTS_COLLECTION_NAME).add({
    ...event,
    hostedUid: user?.uid,
    hostedBy: user?.displayName,
    hostPhotoURL: user?.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
  });
}

export function updateEventInFirestore(event: IEvent) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId: string) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(eventId).delete();
}

export function cancelEventToggle(event: IEvent) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}

export function setUserProfileData(user: any) {
  return db
    .collection(USERS_COLLECTION_NAME)
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId: string) {
  return db.collection(USERS_COLLECTION_NAME).doc(userId);
}

export async function updateUserProfile(profile: any) {
  const user = firebase.auth().currentUser;
  try {
    if (user?.displayName !== profile.displayName) {
      await user?.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db
      .collection(USERS_COLLECTION_NAME)
      .doc(user?.uid)
      .update(profile);
  } catch (error) {
    throw error;
  }
}

export async function updateUserProfilePhoto(
  downloadURL: string,
  filename: string
) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection(USERS_COLLECTION_NAME).doc(user?.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data()?.photoURL) {
      await db.collection(USERS_COLLECTION_NAME).doc(user?.uid).update({
        photoURL: downloadURL,
      });
      await user?.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db
      .collection(USERS_COLLECTION_NAME)
      .doc(user?.uid)
      .collection(PHOTOS_COLLECTION_NAME)
      .add({
        name: filename,
        url: downloadURL,
      });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid: string) {
  return db
    .collection(USERS_COLLECTION_NAME)
    .doc(userUid)
    .collection(PHOTOS_COLLECTION_NAME);
}

export async function setMainPhoto(photo: IPhoto) {
  const user = firebase.auth().currentUser;
  try {
    await db
      .collection(USERS_COLLECTION_NAME)
      .doc(user?.uid)
      .update({ photoURL: photo.url });
    return await user?.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {}
}

export function deletePhotoFromCollection(photoId: string) {
  const userUid = firebase.auth().currentUser?.uid;
  return db
    .collection(USERS_COLLECTION_NAME)
    .doc(userUid)
    .collection(PHOTOS_COLLECTION_NAME)
    .doc(photoId)
    .delete();
}

export function addUserAttendance(event: IEvent) {
  const user = firebase.auth().currentUser;

  return db
    .collection(EVENTS_COLLECTION_NAME)
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user?.uid),
    });
}

export async function cancelUserAttendance(event: IEvent) {
  const user = firebase.auth().currentUser;

  try {
    const eventDoc = await db
      .collection(EVENTS_COLLECTION_NAME)
      .doc(event.id)
      .get();

    return db
      .collection(EVENTS_COLLECTION_NAME)
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user?.uid),
        attendees: eventDoc
          .data()
          ?.attendees.filter((attendee: IAttendant) => attendee.id !== user?.uid),
      });
  } catch (error) {
    throw error;
  }
}
