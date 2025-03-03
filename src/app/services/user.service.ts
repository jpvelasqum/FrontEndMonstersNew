import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  public loggedIn = false;
  public username = '';
  constructor(private http: HttpClient) { }

  readUsers() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/get-users`);
  }

  createUser(user: any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-user`,user);
  }

  loginUser(user: any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login-user`,user);
  }

  findUser(id: string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/find-user/${id}`);
  }

  deleteUser(id: string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-user/${id}`);
  }

  updateUser(user: any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update-user`,user);
  }

}
