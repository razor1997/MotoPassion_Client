export interface CommunityPost {
  id: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  imageUrl: string;
  description: string;
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
}
