import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService) {}

  get role(): string {
    return this.authService.getCurrentUser()?.role || ''
  }

  // Peut voir le bouton New Client
  canCreateClient(): boolean {
    return ['admin', 'manager'].includes(this.role)
  }

  // Peut supprimer un client
  canDeleteClient(): boolean {
    return this.role === 'admin'
  }

  // Peut modifier un client
  canEditClient(): boolean {
    return ['admin', 'manager'].includes(this.role)
  }

  // Peut voir le tab Compliance
  canViewCompliance(): boolean {
    return ['admin', 'compliance'].includes(this.role)
  }

  // Peut voir les rapports
  canViewReports(): boolean {
    return ['admin', 'manager'].includes(this.role)
  }

  // Est en mode lecture seule
  isReadOnly(): boolean {
    return this.role === 'readonly'
  }
}