import { Routes } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { ListDepartamentosComponent } from './components/list-departamentos/list-departamentos.component';
import { ListDisfracesComponent } from './components/list-disfraces/list-disfraces.component';

export const routes: Routes = [
    {
        title: 'Lista de empleados',
        path: 'empleados',
        component: ListEmpleadosComponent
    },
    {
        title: 'Lista de departamentos',
        path: 'departamentos',
        component: ListDepartamentosComponent
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
    },
    {
        title: 'Lista de disfraces',
        path: 'disfraces',
        component: ListDisfracesComponent
    }
];
