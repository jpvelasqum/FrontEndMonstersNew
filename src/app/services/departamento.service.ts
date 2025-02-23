import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = "http://localhost:3006/api";

  constructor(private http: HttpClient) { }

  createDepartamento(departamento: any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-departamento`,departamento);
  }

  readDepartamentos() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/read-departamentos`);
  }

  updateDepartamento(departamento: any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update-departamento`,departamento);
  }

  deleteDepartamento(id: string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-departamento/${id}`);
  }

}
