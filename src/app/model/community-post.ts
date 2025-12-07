export interface CommunityPost {
  id: string;
  userName: string;
  userAvatarUrl: string;
  createdAt: string;
  photoUrl: string;
  description: string;
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
}
