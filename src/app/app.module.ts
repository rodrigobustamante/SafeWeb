// Angular, animaciones y tablas
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { LoadingModule } from "ngx-loading";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpClientModule } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";
// Componentes
import { LoginComponent } from "./components/auth/login/login.component";
import { PasswordForgotComponent } from "./components/auth/password-forgot/password-forgot.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { CustomerListComponent } from "./components/customer/customer-list/customer-list.component";
import { ShowEvaluationComponent } from "./components/evaluation/show-evaluation/show-evaluation.component";
import { ShowCustomerComponent } from "./components/customer/show-customer/show-customer.component";
import { TrainingListComponent } from "./components/training/training-list/training-list.component";
import { CreateTrainingComponent } from "./components/training/create-training/create-training.component";
import { ShowTrainingComponent } from "./components/training/show-training/show-training.component";
import { ShowEmployeeComponent } from "./components/employee/show-employee/show-employee.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";
import { CreateEvaluationComponent } from "./components/evaluation/create-evaluation/create-evaluation.component";
import { EvaluationListComponent } from "./components/evaluation/evaluation-list/evaluation-list.component";
// Servicios
import { AuthService } from "./services/auth/auth.service";
import { EvaluationCreateService } from "./services/evaluation/evaluation-create.service";
import { TrainingCreateService } from "./services/training/training-create.service";
// Guardias
import { AuthGuard } from "./guards/auth.guard";
import { AdministratorGuard } from "./guards/roles/administrator.guard";
import { CompanyGuard } from "./guards/roles/company.guard";
import { EmployeeGuard } from "./guards/roles/employee.guard";
import { EngineerGuard } from "./guards/roles/engineer.guard";
import { SupervisorGuard } from "./guards/roles/supervisor.guard";
import { TechnicalGuard } from "./guards/roles/technical.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "recovery", component: PasswordForgotComponent },
  {
    path: "employees",
    canActivate: [AuthGuard],
    children: [
      { path: "", component: EmployeeListComponent },
      { path: ":id", component: ShowEmployeeComponent }
    ]
  },
  {
    path: "customers",
    canActivate: [AuthGuard],
    children: [
      { path: "", component: CustomerListComponent },
      { path: ":id", component: ShowCustomerComponent }
    ]
  },
  {
    path: "evaluations",
    canActivate: [AuthGuard],
    children: [
      { path: "", component: EvaluationListComponent },
      {
        path: "create",
        component: CreateEvaluationComponent,
        canActivate: [AdministratorGuard]
      },
      { path: ":id", component: ShowEvaluationComponent }
    ]
  },
  {
    path: "trainings",
    canActivate: [AuthGuard],
    children: [
      {path: "", component: TrainingListComponent},
      {
        path: "create",
        component: CreateTrainingComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordForgotComponent,
    NavbarComponent,
    HomeComponent,
    CustomerListComponent,
    CreateEvaluationComponent,
    EvaluationListComponent,
    ShowEvaluationComponent,
    ShowCustomerComponent,
    TrainingListComponent,
    CreateTrainingComponent,
    ShowTrainingComponent,
    ShowEmployeeComponent,
    EmployeeListComponent
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
  providers: [
    AuthGuard,
    AdministratorGuard,
    CompanyGuard,
    EmployeeGuard,
    EngineerGuard,
    SupervisorGuard,
    TechnicalGuard,
    AuthService,
    EvaluationCreateService,
    TrainingCreateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
