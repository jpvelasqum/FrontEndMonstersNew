import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisfrazService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createDisfraz(disfraz: any): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', disfraz.nombre);
    formData.append('talla', disfraz.talla);
    formData.append('color', disfraz.color);
    formData.append('precio', disfraz.precio);
    formData.append('categoria', disfraz.categoria);
    formData.append('imagen', disfraz.imagen);
    return this.http.post<any>(`${this.apiUrl}/Disfraz`, formData);
  }

  readDisfraces() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Disfraz`);
  }

  getImage(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Disfraz/imagen/${id}`);
  }
}
