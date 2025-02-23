import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  username: string = '';
  password: string = '';
  user: any = {username:''}
  swal: any = Swal;
  constructor(private userService: UserService) {}

  login(): void {
    this.userService.loginUser({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log(this.username);
        this.setLog(true);
        this.setName(this.username);
        Swal.fire({
          icon: 'success',
          title: response.msg
        })
        console.log('Sesion iniciada');
        this.username = '';
        this.password = '';
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

  isLogged(): boolean{
    return this.userService.loggedIn;
  }

  setLog(a: boolean): void{
    this.userService.loggedIn = a;
  }

  setName(n: string): void{
    this.userService.username = n;
  }

}
