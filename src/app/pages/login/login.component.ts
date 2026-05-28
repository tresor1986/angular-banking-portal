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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields'
      return
    }
    const success = this.authService.login(this.email, this.password)
    if (success) {
      this.router.navigate(['/home'])
    } else {
      this.error = 'Invalid email or password'
    }
  }
}