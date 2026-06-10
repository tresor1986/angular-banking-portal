import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  email = ''
  password = ''
  error = ''
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields'
      return
    }

    this.loading = true
    this.error = ''

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/dashboard'])
        } else {
          this.error = 'Invalid email or password'
          this.loading = false
        }
      },
      error: () => {
        this.error = 'Invalid email or password'
        this.loading = false
      }
    })
  }
}