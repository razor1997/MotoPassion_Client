export interface EventAutomotive {
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
  createdAt: string;
  type: number;
  location: string;
  visibility: number;
  participantsCount: number;
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
  createdAt: string;
  type: number;
  location: string;
  visibility: number;
  participantsCount: number;
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

export interface EventRow {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  location: string;
  description: string;
  participantsCount: number;
  maxCountParticipants?: number;
}
