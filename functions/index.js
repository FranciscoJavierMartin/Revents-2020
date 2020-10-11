const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapshot, context) => {
    try {
      const userDoc = await db
        .collection('users')
        .doc(context.params.userUid)
        .get();

      const batch = db.batch();

      batch.set(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        followersCount: admin.firestore.FieldValue.increment(1),
      });

      return await batch.commit();
    } catch (error) {
      console.log(error);
    }
  });

exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();
    try {
      batch.delete(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollowers')
          .doc(context.params.userUid)
      );

      batch.update(db.collection('users').doc(context.params.profileId), {
        followersCount: admin.firestore.FieldValue.increment(-1),
      });

      return await batch.commit();
    } catch (error) {
      console.log(error);
    }
  });

exports.updateUserData = functions.firestore
  .document('users/{userUid}')
  .onUpdate(async (snapshot, context) => {
    const batch = db.batch();
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    const previousPhotoURL = before.photoURL;
    const newPhotoURL = after.photoURL;
    const previousDisplayName = before.displayName;
    const newDisplayName = after.displayName;

    if (
      previousPhotoURL !== newPhotoURL ||
      previousDisplayName !== newDisplayName
    ) {
      const goingEventsByUser = await db
        .collection('events')
        .where('attendeeIds', 'array-contains', context.params.userUid)
        .get();

      goingEventsByUser.forEach((event) => {
        const eventData = event.data();
        let hostPhotoURL = eventData.hostPhotoURL;
        let hostedBy = eventData.hostedBy;

        if (eventData.hostUid === context.params.userUid) {
          hostPhotoURL = newPhotoURL;
          hostedBy = newDisplayName;
        }

        const indexUserOnAttendee = eventData.attendees.findIndex(
          (attendant) => attendant.id === context.params.userUid
        );
        eventData.attendees[indexUserOnAttendee].photoURL = newPhotoURL;
        eventData.attendees[indexUserOnAttendee].displayName = newDisplayName;

        batch.update(db.collection('events').doc(event.id), {
          hostPhotoURL,
          hostedBy,
          attendees: eventData.attendees,
        });
      });

      const followers = await db
        .collection('following')
        .doc(context.params.userUid)
        .collection('userFollowers')
        .get();
      const followings = await db
        .collection('following')
        .doc(context.params.userUid)
        .collection('userFollowing')
        .get();

      followers.forEach((user) => {
        batch.update(
          db
            .collection('following')
            .doc(user.id)
            .collection('userFollowing')
            .doc(context.params.userUid),
          {
            photoURL: newPhotoURL,
            displayName: newDisplayName,
          }
        );
      });

      followings.forEach((user) => {
        batch.update(
          db
            .collection('following')
            .doc(user.id)
            .collection('userFollowers')
            .doc(context.params.userUid),
          {
            photoURL: newPhotoURL,
            displayName: newDisplayName,
          }
        );
      });

      return batch.commit();
    }
  });

exports.eventUpdated = functions.firestore
  .document('events/{eventId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();
    if (before.attendees.length < after.attendees.length) {
      let attendeeJoined = after.attendees.filter(
        (item1) => !before.attendees.some((item2) => item2.id === item1.id)
      )[0];
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeJoined.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeJoined,
                'joined-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (before.attendees.length > after.attendees.length) {
      let attendeeLeft = before.attendees.filter(
        (item1) => !after.attendees.some((item2) => item2.id === item1.id)
      )[0];
      try {
        const followerDocs = await db
          .collection('following')
          .doc(attendeeLeft.id)
          .collection('userFollowers')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeLeft,
                'left-event',
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

function newPost(user, code, eventId, event) {
  return {
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.displayName,
    eventId,
    userUid: user.id,
    title: event.title,
  };
}
