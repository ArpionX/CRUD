import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CrudComponent } from './components/crud/crud.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { HomeComponent } from './components/home/home.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { LoginComponent } from './components/login/login.component';
import { PosicionesComponent } from './components/posiciones/posiciones.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CalendarioComponent } from './componentsEstudiante/calendario/calendario.component';
import { ConsultaComponent } from './componentsEstudiante/consulta/consulta.component';
import { GaleriaComponent } from './componentsEstudiante/galeria/galeria.component';
import { InicioComponent } from './componentsEstudiante/inicio/inicio.component';
import { JugadoresEstudianteComponent } from './componentsEstudiante/jugadores-estudiante/jugadores-estudiante.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

export const routes: Routes = [

  {
    path: '',
    title: 'Login',
    component: LoginComponent,
    // canActivate: [AuthGuard] // Add authentication guard to restrict access to routes requiring authentication

  },
  {
    path: 'crud',
    title: 'CRUD',
    component: CrudComponent
  },
  {
    path: 'admin',
    title: 'Admin',
    component: AdminComponent,
    children:[
    {
        path:'home',
        title: 'home',
        component: HomeComponent
    },
    {
      path: 'registro',
      title: 'Registro',
      component: RegistroComponent,

    },
    {
      path: 'jugadores',
      title: 'Jugadores',
      component: JugadoresComponent,
    },
    {

      path: 'jugadores/:id',
      title: 'Registro Jugadores',
      component: JugadoresComponent,
    },
    {
      path: 'gestion',
      title: 'Gestion',
      component: GestionComponent,
    },
    {
      path: 'posiciones',
      title: 'Posiciones',
      component: PosicionesComponent,
    }
    ]
  },
  {
    path:'estudiante',
    title: 'Estudiante',
    component: EstudianteComponent,
    children:[
      {
        path:'inicio',
        title: 'inicio',
        component: InicioComponent
      },
      {
        path:'consulta',
        title: 'consulta',
        component: ConsultaComponent
      },
      {
        path:'calendario',
        title: 'calendario',
        component: CalendarioComponent
      },
      {
        path:'galeria',
        title: 'galeria',
        component: GaleriaComponent
      },
      {
        path:'jugadoresEstudiante/:id',
        title: 'Jugadores Estudiante',
        component: JugadoresEstudianteComponent,
      }
    ]
  }
];
