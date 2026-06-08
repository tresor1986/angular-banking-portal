import { Component, OnInit } from '@angular/core'
import { ClientService } from '../../services/client.service'
import { ClientItem } from '../../models/client.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  clients: ClientItem[] = []
  recentClients: ClientItem[] = []

  stats = {
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0
  }

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.clientService.getClients().subscribe({
    next: (clients) => {
      this.clients = clients
      this.stats.total = clients.length
      this.stats.active = clients.filter(c => c.status === 'active').length
      this.stats.pending = clients.filter(c => c.status === 'pending').length
      this.stats.inactive = clients.filter(c => c.status === 'inactive').length
      this.recentClients = clients.slice(0, 3)
    },
    error: (err) => {
      console.error('Erreur chargement clients', err)
    }
  })
}

  goToClient(id: number): void {
    this.router.navigate(['/client', id])
  }

  goToClients(): void {
    this.router.navigate(['/home'])
  }
}