import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './components/login/login.component';
import { Main } from './layout/main/main.component';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'chat', component: Main }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
