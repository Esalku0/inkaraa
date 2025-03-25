import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservaCitaComponent } from './reserva-cita/reserva-cita.component';
import { LoginComponent } from './login/login.component';
import { VerDisenyosComponent } from './ver-disenyos/ver-disenyos.component';
import { RegisterComponent } from './register/register.component';
import { VerArtistasComponent } from './ver-artistas/ver-artistas.component';
import { PantallaGestionComponentArtista } from './pantalla-gestion-artista/pantalla-gestion.component-artista';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'reserva', component: ReservaCitaComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verDisenyos', component: VerDisenyosComponent },
  { path: 'verArtistas', component: VerArtistasComponent },
  {path: 'gestionArtista', component: PantallaGestionComponentArtista,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];
