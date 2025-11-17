export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserData {
  uid: string | null;
  email: string | null;
  photoURL: string | null;
  displayName?: string | null;
}