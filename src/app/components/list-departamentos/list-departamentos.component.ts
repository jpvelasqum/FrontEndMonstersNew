import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../services/empleado.service';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-list-departamentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-departamentos.component.html',
  styleUrl: './list-departamentos.component.css'
})
export class ListDepartamentosComponent {
   /**
     *
     */
    departamentos: any[] = [];
    empleados: any[] = [];
    currentDepartamento: any = { codigo_departamento: '' , nombre: ''};
    newDepartamento: any = { codigo_departamento: '' , nombre: ''};
    amount: number = 0;
    editing: boolean = false;
    adding: boolean = false;
    constructor(private userService: UserService, private empleadoService: EmpleadoService, private departamentoService: DepartamentoService) { }
  
    ngOnInit(): void {
      this.loadDepartamentos();
    }
  
  
    loadDepartamentos(): void {
      this.departamentoService.readDepartamentos().subscribe(
  
        (response) => {
          this.departamentos = response.departamentos;
        })
    }
  
    delete(nombre: string, id: string): void {
      console.log(nombre);
  
      Swal.fire({
        title: `Eliminar el departamento de ${nombre} ?`,
        text: "Esto no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
          this.departamentoService.deleteDepartamento(id).subscribe({
            next: (response) => {
              Swal.fire({
                icon: "success",
                title: response.msg
              });
              console.log(response);
              this.loadDepartamentos();
            },
            error: (error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.error.msg
              });
            }
          }
          )
        }
      });
    }
  
    update(): void {
      console.log(this.currentDepartamento);

      this.departamentoService.updateDepartamento(this.currentDepartamento).subscribe({
        next: (response) => {
          Swal.fire({
            icon: "success",
            title: response.msg
          });
          console.log(response);
          this.editing = false;
          this.loadDepartamentos();
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error.msg
          });
        }
      })
    }
  
    addDepartamento(): void {

      this.departamentoService.createDepartamento(this.newDepartamento).subscribe({
        next: (response) => {
          Swal.fire({
            icon: "success",
            title: response.msg
          });
          this.adding = false;
          this.loadDepartamentos();
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error.msg
          });
        }
      }
      )
    }
  
    count(a:number): void {
      this.amount = a;
    }
  
    isLogged(): boolean {
      return this.userService.loggedIn;
    }
  
    setLog(a: boolean): void {
      this.userService.loggedIn = a;
    }
}
