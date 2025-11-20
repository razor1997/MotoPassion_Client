export interface ProfileEdit
{
  avatarUrl: string;
  bio: string;
  carModel: string;
  baseLocation: string;
  name: string;
  surname: string;
  avatar?: File | null;
  email: string;

}
export interface ProfileEditResponse
{
  avatarUrl: string;
  bio: string;
  carModel: string;
  baseLocation: string;
}
export interface ProfileSettingsEdit
{
  email: string;
  password: string;
  userName: string;
}
