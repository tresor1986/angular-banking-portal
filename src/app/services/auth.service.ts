import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, tap } from 'rxjs'

export interface UserProfile {
  email: string
  role: 'admin' | 'manager' | 'compliance' | 'readonly'
  name: string
}

interface AuthResponse {
  token: string
  user: UserProfile
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7281/api/auth'

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

  getCurrentUser(): UserProfile | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin'
  }

  isReadOnly(): boolean {
    return this.getCurrentUser()?.role === 'readonly'
  }
}