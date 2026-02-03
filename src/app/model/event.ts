export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  longitude: number;
  latitude: number;
  photoUrl: string;
  category: number;
  maxCountParticipants: number;
  creatorId: string;
}
export interface EventDto {
  id: string;
  title: string;
  description: string;
  date: string;
  longitude: number;
  latitude: number;
  photoUrl: string;
  category: number;
  maxCountParticipants: number;
  creatorId: string;
  creator: {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;
  };
}
export interface EventCreate {
  title: string;
  description: string;
  date: string; // ISO string
  latitude: number;
  longitude: number;
  category: number;
  maxCountParticipants: number;
  photo?: File | null;
}

