export interface CommunityPostParticipant {
  userId: string;
  userName: string;
  avatarUrl: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  userId?: string;
  userName: string;
  userAvatarUrl: string;
  createdAt: string;
  photoUrl: string;
  description: string;
  participants?: CommunityPostParticipant[];
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
}
