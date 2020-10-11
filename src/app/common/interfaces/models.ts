export interface IEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  // city: IAddress;
  // venue: IAddress;
  date: Date;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: IAttendant[];
  isCancelled?: boolean;
  attendeeIds: string[];
  hostUid: string;
}

export interface IAttendant {
  id: string;
  displayName: string;
  photoURL: string;
}

export interface IAddress {
  address: string;
  latLng: {
    lat: number;
    lng: number;
  };
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface IPhoto {
  name: string;
  url: string;
  id: string;
}

export interface IComment {
  diplayName: string;
  photoURL: string;
  uid: string;
  text: string;
  date: Date;
  id: string;
  parentId?: string;
  childNodes: IComment[];
}

export interface IProfile {
  createdAt: Date;
  description: string;
  displayName: string;
  email: string;
  photoURL: string;
  followersCount: number;
  followingCount: number;
}