import { Component, OnInit } from '@angular/core'
import { ClientItem } from '../../models/client.model'
import { ClientService } from '../../services/client.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  clients: ClientItem[] = []
  filteredClients: ClientItem[] = []
  searchText = ''
  loading = true

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.clients = this.clientService.getClients()
  this.filteredClients = [...this.clients]
  this.loading = false
}

  onSearch(): void {
    const term = this.searchText.toLowerCase()
    this.filteredClients = this.clients.filter(c =>
      c.companyName.toLowerCase().includes(term) ||
      c.companyId.toLowerCase().includes(term) ||
      c.sector.toLowerCase().includes(term)
    )
  }

goToDetail(event: any): void {
  const client = event.data
  if (client?.id) {
    this.router.navigate(['/client', client.id])
  }
}

  logout(): void {
    this.authService.logout()
  }

  get currentUser() {
    return this.authService.getCurrentUser()
  }
}