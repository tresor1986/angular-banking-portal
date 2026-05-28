import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

export interface UserProfile {
  email: string
  role: 'admin' | 'manager' | 'compliance' | 'readonly'
  name: string
}

const MOCK_USERS: UserProfile[] = [
  { email: 'admin@bank.lu', role: 'admin', name: 'Admin User' },
  { email: 'manager@bank.lu', role: 'manager', name: 'Jean Müller' },
  { email: 'compliance@bank.lu', role: 'compliance', name: 'Marie Hoffmann' },
  { email: 'readonly@bank.lu', role: 'readonly', name: 'Guest User' },
]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = MOCK_USERS.find(u => u.email === email)
    if (user && password === '1234') {
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

  logout(): void {
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  getCurrentUser(): UserProfile | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin'
  }

  isReadOnly(): boolean {
    return this.getCurrentUser()?.role === 'readonly'
  }
}