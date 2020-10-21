import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AuthguardService } from './services/authguard.service';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'loginregister/:action', component: LoginRegisterComponent},
  {path: 'addeditbook', component: AddEditBookComponent, canActivate: [AuthguardService]},
  {path: 'addeditbook/:id', component: AddEditBookComponent, canActivate: [AuthguardService]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
