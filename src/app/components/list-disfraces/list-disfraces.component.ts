import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisfrazService } from '../../services/disfraz.service';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-disfraces',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-disfraces.component.html',
  styleUrl: './list-disfraces.component.css'
})
export class ListDisfracesComponent implements OnInit {

  disfraces: any[] = [];
  currentDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: '' };
  newDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: '' };
  currentImage: any;
  amount: number = 0;
  editing: boolean = false;
  adding: boolean = false;
  constructor(private userService: UserService, private disfrazService: DisfrazService,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDisfraces();
  }

  loadDisfraces(): void {

    this.disfrazService.readDisfraces().subscribe(

      (response) => {
        this.disfraces = response.disfraces;
        this.disfraces.forEach(disfraz => {
          disfraz.imagenUrl = `${environment.apiUrl}/imagen/${disfraz.imagen}`;
        });
      })
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
    }
  }

  addDisfraz(): void {
    this.adding = true;
  }

  saveDisfraz(): void {
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

}
