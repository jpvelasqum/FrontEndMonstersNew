import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisfrazService } from '../../services/disfraz.service';

@Component({
  selector: 'app-list-disfraces',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-disfraces.component.html',
  styleUrl: './list-disfraces.component.css'
})
export class ListDisfracesComponent implements OnInit {

  disfraces: any[] = [];
  currentDisfraz: any = { nombre: '', talla: '', color: '' , precio: '', categoria: '', imagen: File };
  newDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: File };
  currentImage: any;
  amount: number = 0;
  editing: boolean = false;
  adding: boolean = false;
  constructor(private userService: UserService, private disfrazService: DisfrazService) { }

  ngOnInit(): void {
    this.loadDisfraces();
  }

  loadDisfraces(): void {

    this.disfrazService.readDisfraces().subscribe(

      (response) => {
        this.disfraces = response.disfraces;
      })
  }

  getImagen(id: string): void {
    this.currentImage = document.getElementById('disfrazImage');
    this.disfrazService.getImage(id).subscribe(
      (response) => {
        response.json();
        this.currentImage.src = response.primaryImage;
      }
    )
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
