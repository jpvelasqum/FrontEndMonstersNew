import { Component } from '@angular/core';
import { DisfrazService } from '../../services/disfraz.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  disfraces: any[] = [];
  currentDisfraz: any = { nombre: '', talla: '', color: '', precio: '', categoria: '', imagen: '' };
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
        console.log(response);
        this.disfraces = response.disfraces;
        this.disfraces.forEach(disfraz => {
          disfraz.imagenUrl = `${environment.apiUrl}/imagen/${disfraz.imagen}`;
        });
      })
  }
}
