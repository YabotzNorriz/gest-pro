import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlAPI = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {
    console.log('usuario ativado');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlAPI);
  }

  getUsersById(id: string | number): Observable<User> {
    return this.http.get<User>(this.urlAPI + '/' + id);
  }

  updateUser(user: User, newUser: User): Observable<User> {
    return this.http.put<User>(this.urlAPI + '/' + Number(user.id), newUser);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        console.log('Lista de usuários:', users);
        return users.some((user) => user.email === email);
      })
    );
  }

  private generateRandomId(): string {
    return 'User' + Math.floor(Math.random() * 1000000);
  }

  createUser(user: User): Observable<User> {
    user.id = this.generateRandomId();
    return this.http.post<User>(this.urlAPI, user);
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.urlAPI + '/' + user.id);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(
      `${this.urlAPI}?email=${email}&senha=${password}`
    );
  }
}
