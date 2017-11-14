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

// Autenticación
import { LoginComponent } from "./components/auth/login/login.component";
import { PasswordForgotComponent } from "./components/auth/password-forgot/password-forgot.component";
import { DoctorLoginComponent } from "./components/doctor/doctor-login/doctor-login.component";

// Menú de navegación
import { NavbarComponent } from "./components/navbar/navbar.component";

// Bienvenida
import { HomeComponent } from "./components/home/home.component";

// Clientes / Empresas
import { CustomerListComponent } from "./components/customer/customer-list/customer-list.component";
import { ShowCustomerComponent } from "./components/customer/show-customer/show-customer.component";

// Empleados
import { ShowEmployeeComponent } from "./components/employee/show-employee/show-employee.component";
import { EmployeeListComponent } from "./components/employee/employee-list/employee-list.component";

// Evaluaciones
import { EvaluationListComponent } from "./components/evaluation/evaluation-list/evaluation-list.component";
import { ShowEvaluationComponent } from "./components/evaluation/show-evaluation/show-evaluation.component";
import { CreateEvaluationComponent } from "./components/evaluation/create-evaluation/create-evaluation.component";
import { EditEvaluationComponent } from "./components/evaluation/edit-evaluation/edit-evaluation.component";

// Capacitaciones
import { TrainingListComponent } from "./components/training/training-list/training-list.component";
import { ShowTrainingComponent } from "./components/training/show-training/show-training.component";
import { CreateTrainingComponent } from "./components/training/create-training/create-training.component";
import { RegisterAttendeesComponent } from "./components/training/register-attendees/register-attendees.component";
import { TrainingAssistanceComponent } from "./components/training/training-assistance/training-assistance.component";

// Doctores
import { DoctorListComponent } from "./components/doctor/doctor-list/doctor-list.component";
import { MedicalVisitComponent } from "./components/doctor/medical-visit/medical-visit.component";
import { RegisterExamComponent } from "./components/doctor/register-exam/register-exam.component";
import { RegisterMedicalVisitComponent } from "./components/doctor/register-medical-visit/register-medical-visit.component";
import { DoctorGuard } from "./guards/roles/doctor.guard";
import { MedicalVisitListComponent } from "./components/doctor/medical-visit-list/medical-visit-list.component";
import { ShowMedicalVisitComponent } from "./components/doctor/show-medical-visit/show-medical-visit.component";

// Servicios
import { AuthService } from "./services/auth/auth.service";
import { EvaluationCreateService } from "./services/evaluation/evaluation-create.service";
import { TrainingCreateService } from "./services/training/training-create.service";
import { DoctorService } from "./services/doctor/doctor.service";

// Guardias
import { AuthGuard } from "./guards/auth.guard";
import { CheckRoleGuard } from "./guards/check-role.guard";

// Rutas
const appRoutes: Routes = [
  // Sin autenticación
  {
    path: "login",
    children: [
      { path: "", component: LoginComponent },
      { path: "doctor", component: DoctorLoginComponent },
      { path: "recovery", component: PasswordForgotComponent }
    ]
  },
  // Autenticación requerida

  // Página de bienvenida
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },

  // Páginas de empleados
  {
    path: "employees",
    canActivate: [AuthGuard, CheckRoleGuard],
    data: { allowedRoles: ["Admin", "Supervisor", "Empresa"] },
    children: [
      { path: "", component: EmployeeListComponent },
      { path: ":id", component: ShowEmployeeComponent }
    ]
  },

  // Páginas de clientes/empresas
  {
    path: "customers",
    canActivate: [AuthGuard, CheckRoleGuard],
    data: { allowedRoles: ["Admin", "Supervisor"] },
    children: [
      { path: "", component: CustomerListComponent },
      { path: ":id", component: ShowCustomerComponent }
    ]
  },

  // Páginas de evaluaciones
  {
    path: "evaluations",
    children: [
      {
        path: "",
        component: EvaluationListComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Ingeniero", "Empresa"] }
      },
      {
        path: "create",
        component: CreateEvaluationComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Tecnico"] }
      },
      {
        path: ":id",
        component: ShowEvaluationComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Ingeniero", "Empresa"] }
      },
      {
        path: ":id/edit",
        component: EditEvaluationComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Ingeniero"] }
      }
    ]
  },

  // Páginas de capacitaciones
  {
    path: "trainings",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: TrainingListComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Empresa", "Trabajador"] }
      },
      {
        path: "assistance/:id",
        component: TrainingAssistanceComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor"] }
      },
      {
        path: "create",
        children: [
          {
            path: "",
            component: CreateTrainingComponent,
            canActivate: [AuthGuard, CheckRoleGuard],
            data: { allowedRoles: ["Admin", "Supervisor"] }
          },
          {
            path: "attendees",
            component: RegisterAttendeesComponent,
            canActivate: [AuthGuard, CheckRoleGuard],
            data: { allowedRoles: ["Admin", "Supervisor"] }
          }
        ]
      },
      {
        path: ":id",
        component: ShowTrainingComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Empresa", "Trabajador"] }
      }
    ]
  },

  // Páginas de doctores
  {
    path: "doctors",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DoctorListComponent,
        canActivate: [CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor"] }
      },
      {
        path: "attention/:id",
        component: ShowMedicalVisitComponent,
        canActivate: [CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Trabajador", "Doctor"] }
      },
      {
        path: "register-exam",
        component: RegisterExamComponent,
        canActivate: [CheckRoleGuard],
        data: { allowedRoles: ["Doctor"] }
      },
      {
        path: "register-medical-visit",
        component: RegisterMedicalVisitComponent,
        canActivate: [CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor"] }
      },
      {
        path: "medical-visit",
        component: MedicalVisitComponent,
        canActivate: [CheckRoleGuard],
        data: { allowedRoles: ["Doctor"] }
      },
      {
        path: "medical-visit-list",
        component: MedicalVisitListComponent,
        canActivate: [AuthGuard, CheckRoleGuard],
        data: { allowedRoles: ["Admin", "Supervisor", "Empresa", "Trabajador"] }
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
    EmployeeListComponent,
    RegisterAttendeesComponent,
    TrainingAssistanceComponent,
    DoctorLoginComponent,
    DoctorListComponent,
    MedicalVisitComponent,
    RegisterExamComponent,
    EditEvaluationComponent,
    RegisterMedicalVisitComponent,
    MedicalVisitListComponent,
    ShowMedicalVisitComponent
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
    CheckRoleGuard,
    AuthGuard,
    DoctorGuard,
    AuthService,
    EvaluationCreateService,
    TrainingCreateService,
    DoctorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
