import { Injectable, inject } from '@angular/core';
import { updatePassword } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';


import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user
} from '@angular/fire/auth';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
    private auth = inject(Auth);
    private storage = inject(Storage);

  /**
   * Uploads a user photo to Firebase Storage and updates the user's profile photoURL.
   * Returns the download URL.
   */
  public async uploadUserPhoto(file: File): Promise<string | null> {
    const user = this.auth.currentUser;
    console.log('Authenticated UID:', user?.uid);
    if (!user) return null;
    const filePath = `user_photos/${user.uid}/${Date.now()}_${file.name}`;
    console.log('Uploading photo to:', filePath);
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL: url });
    return url;
  }

  /**
   * Changes the current user's password.
   * Throws error if not logged in or if update fails.
   */
  public async changePassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado.');
    await updatePassword(user, newPassword);
  }


  /**
   * Reauthenticates the user with email and password.
   */
  public async reauthenticate(email: string, password: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado.');
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
  }

  public async register({ email, password }: { email: string; password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  public async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  public async logout() {
    return signOut(this.auth);
  }

  public getUserData$() {
    return user(this.auth).pipe(
      map(user => ({
        uid: user?.uid || null,
        email: user?.email || null,
        photoURL: user?.photoURL || null,
        displayName: user?.displayName || null,
      }))
    );
  }
}
