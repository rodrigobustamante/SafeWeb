import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { LoadingModule } from 'ngx-loading';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { CreateEvaluationComponent } from './components/create-evaluation/create-evaluation.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: PasswordForgotComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'evaluations/create', component: CreateEvaluationComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordForgotComponent,
    NavbarComponent,
    HomeComponent,
    CustomerListComponent,
    CreateEvaluationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MdButtonModule,
    LoadingModule,
    FlashMessagesModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
