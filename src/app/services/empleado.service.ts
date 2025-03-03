import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = "http://localhost:3006/api";

  constructor(private http: HttpClient) { }

  createEmpleado(empleado: any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-empleado`,empleado);
  }

  readEmpleados() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/read-empleados`);
  }

  updateEmpleado(empleado: any) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/update-empleado`,empleado);
  }

  deleteEmpleado(id: string) : Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-empleado/${id}`);
  }

  findEmpleado(id: string) : Observable<any>{
    return this.http.get(`${this.apiUrl}/find-empleado/${id}`);
  }
}
