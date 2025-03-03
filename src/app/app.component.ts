import { Component } from '@angular/core';
import { routes } from './app.routes';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,CommonModule],
  providers:[AppComponent],
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba_tecnica_2_frontend';
  routes = routes; // rutas pa la navbar
  constructor(private userService: UserService){}

  isLogged(): boolean{
    return this.userService.loggedIn;
  }

  name(): string{
    return this.userService.username;
  }

  setLog(a: boolean): void{
    this.userService.loggedIn = a;
  }

  setName(n: string): void{
    this.userService.username = n;
  }
}
