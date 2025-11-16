import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: Auth) {
    console.log('usuario ativado');
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
      console.log("Cheguei aqui - Tentando logar login method");
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  public ogout() {
    return signOut(this.auth);
  }
}
