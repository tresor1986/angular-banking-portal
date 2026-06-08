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
    this.clients = this.clientService.getClients()

    // Calcul des statistiques — comme ton selectCallback en Angular
    this.stats.total = this.clients.length
    this.stats.active = this.clients.filter(c => c.status === 'active').length
    this.stats.pending = this.clients.filter(c => c.status === 'pending').length
    this.stats.inactive = this.clients.filter(c => c.status === 'inactive').length

    // 3 derniers clients
    this.recentClients = this.clients.slice(0, 3)
  }

  goToClient(id: number): void {
    this.router.navigate(['/client', id])
  }

  goToClients(): void {
    this.router.navigate(['/home'])
  }
}