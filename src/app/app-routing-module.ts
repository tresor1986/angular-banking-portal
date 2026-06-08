import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { ClientDetailComponent } from './pages/client-detail/client-detail.component'
import { LayoutComponent } from './layout/layout.component'
import { AuthGuard } from './guards/auth.guard'
import { DashboardComponent } from './pages/dashboard/dashboard.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'client/:id', component: ClientDetailComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}