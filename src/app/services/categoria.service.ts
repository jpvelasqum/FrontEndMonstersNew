import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-categoria`, categoria);
  }

  readCategorias() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/categorias`);
  }

  deleteCategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-categoria/${id}`);
  }

  updateCategoria(categoria: any): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', categoria.nombre);
    return this.http.put<any>(`${this.apiUrl}/update-categoria/${categoria._id}`, formData);
  }

}
