import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisfrazService } from '../../services/disfraz.service';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-list-disfraces',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-disfraces.component.html',
  styleUrl: './list-disfraces.component.css'
})
export class ListDisfracesComponent implements OnInit {

  disfraces: any[] = [];
  categorias: any[] = [];
  currentDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: '' };
  newDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: '' };
  currentImage: any;
  amount: number = 0;
  editing: boolean = false;
  adding: boolean = false;
  constructor(private userService: UserService, private disfrazService: DisfrazService, private categoriaService: CategoriaService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDisfraces();
  }

  loadDisfraces(): void {

    this.disfrazService.readDisfraces().subscribe(

      (response) => {
        console.log(response);
        this.disfraces = response.disfraces;
        this.disfraces.forEach(disfraz => {
          disfraz.imagenUrl = `${environment.apiUrl}/imagen/${disfraz.imagen}`;
        });
      }
    )
  }

  loadCategorias(): void {
    this.categoriaService.readCategorias().subscribe(
      (response) => {
        console.log(response);
        this.categorias = response.categorias;
      }
    )
  }

  test(a: string): void {
    console.log(a);
  }

  getImagen(id: string): void {
    this.currentImage = `${environment.apiUrl}/imagen/${id}`;
    console.log(this.currentImage);
    this.cdRef.detectChanges();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newDisfraz.imagen = file;
      this.currentDisfraz.imagen = file;
    }
  }

  addDisfraz(): void {
    this.adding = true;
  }

  saveDisfraz(): void {
    console.log(this.newDisfraz);
    this.disfrazService.createDisfraz(this.newDisfraz).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: response.msg
        });
        this.loadDisfraces();
        this.adding = false;
        this.newDisfraz = { nombre: '', talla: '', precio: '' };
      },
      error: (error) => {
        console.log(error);
        
        console.log(error.error.msg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.msg
        });
      }
    }
    )
  }

  cancel(): void {
    this.adding = false;
    this.editing = false;
  }

  update(): void {
    console.log(this.currentDisfraz);
    this.disfrazService.updateDisfraz(this.currentDisfraz).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: response.msg
        });
        this.loadDisfraces();
        this.editing = false;
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

  delete(nombre: string, id: string): void {
    console.log(nombre);

    Swal.fire({
      title: `Eliminar ${nombre} ?`,
      text: "Esto no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.disfrazService.deleteDisfraz(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: "success",
              title: "disfraz eliminado",
            });
            console.log(response);
            this.loadDisfraces();
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


  isLogged(): boolean {
    return true;
  }

  setLog(a: boolean): void {
    this.userService.loggedIn = a;
  }
}
