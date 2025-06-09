export interface UserCreate {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarUrl?: string;
  bio?: string;
  baseLocation?: string;
}
