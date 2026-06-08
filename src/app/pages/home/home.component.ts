import { Component, OnInit } from '@angular/core'
import { ClientItem } from '../../models/client.model'
import { ClientService } from '../../services/client.service'
import { PermissionService } from '../../services/permission.service'
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

  constructor(
    private clientService: ClientService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clients = this.clientService.getClients()
    this.filteredClients = [...this.clients]
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

  get canCreate(): boolean {
    return this.permissionService.canCreateClient()
  }

  get canDelete(): boolean {
    return this.permissionService.canDeleteClient()
  }


  newClient(): void {
  // sera implémenté avec le formulaire
  alert('New client form coming soon!')
}

deleteClient(client: ClientItem): void {
  if (confirm(`Delete ${client.companyName}?`)) {
    this.clients = this.clients.filter(c => c.id !== client.id)
    this.filteredClients = this.filteredClients.filter(c => c.id !== client.id)
  }
}
}