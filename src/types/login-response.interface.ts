import { User } from ".";

export interface LoginResponse {
  isNewUser: boolean;
  user: User;
}