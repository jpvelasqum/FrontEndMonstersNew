import { Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

export const routes: Routes = [
    {
        title: 'Lista de empleados',
        path: 'empleados',
        component: ListEmpleadosComponent
    },
    {
        title: 'Registro',
        path: 'register', //ruta de registrar usuario
        component: RegisterUserComponent
    },
    {
        title: 'Inicio de sesion',
        path: 'login',
        component: LoginUserComponent
    }
];
