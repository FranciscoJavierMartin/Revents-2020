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
  attendees: IAttendee[];
}

export interface IAttendee {
  id: string;
  name: string;
  photoURL: string;
}
