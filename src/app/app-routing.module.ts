import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AuthGuardService } from './services/authguard.service';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login-register/:action',
    component: LoginRegisterComponent
  },
  {
    path: 'add-edit-book',
    component: AddEditBookComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-edit-book/:id',
    component: AddEditBookComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
