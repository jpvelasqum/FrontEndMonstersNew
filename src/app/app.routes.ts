import { Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListDisfracesComponent } from './components/list-disfraces/list-disfraces.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        title: 'Home',
        path: '',
        component: HomeComponent
    },
    {
        title: 'Inventario',
        path: 'disfraces',
        component: ListDisfracesComponent
    },
    {
        title: 'Registro',
        path: 'register',
        component: RegisterUserComponent
    },
    {
        title: 'Inicio de sesion',
        path: 'login',
        component: LoginUserComponent
    }
];
