export interface UserPublicProfileDto {
  id: string;
  userName: string;
  name: string;
  surname: string;
  avatarUrl: string;
  bio: string;
  baseLocation: string;

  vehicles: UserProfileVehicleItemDto[];
  joinedEvents: UserProfileEventItemDto[];
  gallery: UserGalleryItemDto[];
  posts: UserPostLinkDto[];
}
export interface UserProfileVehicleItemDto {
  id: string;
  mark: string;
  model: string;
  imageUrl?: string;
  vin?: string;
}
export interface UserGalleryItemDto {
  id: string;
  imageUrl?: string;
  sourcePostId: string;
  sourcePostTitle: string;
}
export interface UserProfileEventItemDto{
  id: string;
  title: string;
  date: string;
  location: string;
  photoUrl: string;
}
export interface UserPostLinkDto {
  id: string;
  title: string;
  photoUrl?: string;
}
