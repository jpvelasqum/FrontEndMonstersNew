import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  /**
   *
   */
  users: any[] = [];
  currentUser: any = { username: '', password: '', updatedPassword: '' };
  editing: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.userService.readUsers().subscribe(

      (response) => {
        this.users = response.users;
      })
  }

  delete(username: string): void {
    console.log(username);
    
    Swal.fire({
      title: `Eliminar a ${username} ?`,
      text: "Esto no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(username).subscribe({
          next: (response) => {
            Swal.fire({
              icon: "success",
              title: response.msg
            });
            console.log(response);
            this.loadUsers();
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
    console.log(this.currentUser);
    this.userService.updateUser(this.currentUser).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: response.msg
        });
        console.log(response);
        this.editing = false;
        this.loadUsers();
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

  isLogged(): boolean{
    return this.userService.loggedIn;
  }

  setLog(a: boolean): void{
    this.userService.loggedIn = a;
  }
}
