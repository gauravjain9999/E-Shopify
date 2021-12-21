import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'', redirectTo: '/loginForm', pathMatch: 'full'},
  {path: 'loginForm', component: LoginFormComponent},
  {path: 'new-login', component:NewLoginComponent },
  {path: 'footer',    component:FooterComponent},
  {path: 'new-register', component: NewRegisterComponent},
  {path: 'mainPage', component:MainPageComponent},
  {path: '**', component: PageNotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
