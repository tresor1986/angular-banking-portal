import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false
})
export class LayoutComponent {
  sidebarVisible = true

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Clients', icon: 'pi pi-users', route: '/home' },
    { label: 'Reports', icon: 'pi pi-chart-bar', route: '/reports' },
    { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get currentUser() {
    return this.authService.getCurrentUser()
  }

  logout(): void {
    this.authService.logout()
  }

  navigate(route: string): void {
    this.router.navigate([route])
  }

  isActive(route: string): boolean {
    return this.router.url === route
  }
}