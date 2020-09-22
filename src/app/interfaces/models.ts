export interface IEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  date: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: IAttendant[];
}

export interface IAttendant {
  id: string;
  displayName: string;
  photoURL: string;
}
