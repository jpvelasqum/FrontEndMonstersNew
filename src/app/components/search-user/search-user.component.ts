import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-search-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {

    username : string = '';
    user : any = {_id:'',username:''};
    found : boolean = false;
    constructor(private userService: UserService){}
  
    search(): void{
      console.log(this.username);
      
      this.userService.findUser(this.username).subscribe({
        next:(response) =>{
          this.found = true;
          console.log(response);
          this.username = '';
          this.user = response.User;
        },
        error:(error) =>{
          this.found = false;
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
}
