import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../services/empleado.service';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-list-empleados',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-empleados.component.html',
  styleUrl: './list-empleados.component.css'
})
export class ListEmpleadosComponent implements OnInit {

  /**
   *
   */
  departamentos: any[] = [];
  empleados: any[] = [];
  currentEmpleado: any = { codigo: '', nombre: '', apellido1: '', apellido2: '', departamento: { nombre: '' } };
  newEmpleado: any = { codigo: '', nombre: '', apellido1: '', apellido2: '', codigo_departamento: '' };
  amount: number = 0;
  editing: boolean = false;
  adding: boolean = false;
  constructor(private userService: UserService, private empleadoService: EmpleadoService, private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {

    this.empleadoService.readEmpleados().subscribe(

      (response) => {
        this.empleados = response.empleados;
      })
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
      title: `Eliminar a ${nombre} ?`,
      text: "Esto no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmpleado(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: "success",
              title: response.msg
            });
            console.log(response);
            this.loadEmpleados();
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
    console.log(this.currentEmpleado);
    console.log(this.currentEmpleado.departamento.codigo);

    this.newEmpleado.codigo = this.currentEmpleado.codigo;
    this.newEmpleado.nombre = this.currentEmpleado.nombre;
    this.newEmpleado.apellido1 = this.currentEmpleado.apellido1;
    this.newEmpleado.apellido2 = this.currentEmpleado.apellido12;
    this.newEmpleado.codigo_departamento = this.currentEmpleado.departamento.codigo_departamento;

    this.empleadoService.updateEmpleado(this.newEmpleado).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: response.msg
        });
        console.log(response);
        this.editing = false;
        this.loadEmpleados();
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

  addEmpleado(): void {
    this.newEmpleado.codigo = this.amount + 1;
    this.newEmpleado.codigo_departamento = this.newEmpleado.departamento.codigo_departamento;
    this.empleadoService.createEmpleado(this.newEmpleado).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: response.msg
        });
        this.adding = false;
        this.loadEmpleados();
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
