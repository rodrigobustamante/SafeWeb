import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordForgotComponent } from './components/auth/password-forgot/password-forgot.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { LoadingModule } from 'ngx-loading';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { CreateEvaluationComponent } from './components/evaluation/create-evaluation/create-evaluation.component';
import { EvaluationListComponent } from './components/evaluation/evaluation-list/evaluation-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { DataTablesModule } from 'angular-datatables';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: PasswordForgotComponent},
  {path: 'customers', canActivate: [AuthGuard],
    children:[
      {path: '', component: CustomerListComponent}
    ]
  },
  {path: 'evaluations', canActivate: [AuthGuard],
    children:[
      {path: '', component: EvaluationListComponent},
      {path: 'create', component: CreateEvaluationComponent}
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordForgotComponent,
    NavbarComponent,
    HomeComponent,
    CustomerListComponent,
    CreateEvaluationComponent,
    EvaluationListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    LoadingModule,
    FlashMessagesModule,
    HttpClientModule,
    HttpModule,
    DataTablesModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
