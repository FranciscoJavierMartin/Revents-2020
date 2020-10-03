import cuid from 'cuid';
import { EVENTS_COLLECTION_NAME } from '../common/constants/firebase';
import { IEvent } from '../common/interfaces/models';
import firebase from './firebase';

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

export function listenToEventFromFirestore(eventId: string| undefined) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(eventId);
}

export function addEventToFirestore(event: IEvent) {
  return db.collection(EVENTS_COLLECTION_NAME).add({
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      photoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    }),
  });
}

export function updateEventInFirestore(event: IEvent) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId: string) {
  return db.collection(EVENTS_COLLECTION_NAME).doc(eventId).delete();
}

export function cancelEventToggle(event: IEvent){
  return db.collection(EVENTS_COLLECTION_NAME).doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
}