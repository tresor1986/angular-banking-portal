import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService, UserProfile } from '../../services/auth.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false
})
export class SettingsComponent implements OnInit {
  currentUser: UserProfile | null = null
  passwordForm: FormGroup

  roleColors: Record<string, string> = {
    admin: '#1976d2',
    manager: '#2e7d32',
    compliance: '#f57f17',
    readonly: '#666'
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser()
  }

  getRoleColor(): string {
    return this.roleColors[this.currentUser?.role || ''] || '#666'
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return

    const { newPassword, confirmPassword } = this.passwordForm.value

    if (newPassword !== confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match'
      })
      return
    }

    // Simulation — dans un vrai projet appel API
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password changed successfully'
    })
    this.passwordForm.reset()
  }
}