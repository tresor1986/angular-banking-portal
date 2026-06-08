import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  showDialog = false

  sectorOptions = [
    { label: 'Investment Fund', value: 'Investment Fund' },
    { label: 'Private Banking', value: 'Private Banking' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'Fintech', value: 'Fintech' },
    { label: 'Asset Management', value: 'Asset Management' },
  ]

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Inactive', value: 'inactive' },
  ]

  clientForm: FormGroup

  constructor(
    private clientService: ClientService,
    private permissionService: PermissionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      companyName: ['', Validators.required],
      companyId: ['', Validators.required],
      sector: ['', Validators.required],
      country: ['', Validators.required],
      manager: ['', Validators.required],
      status: ['active', Validators.required]
    })
  }

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

  newClient(): void {
    this.clientForm.reset({ status: 'active' })
    this.showDialog = true
  }

  saveClient(): void {
    if (this.clientForm.invalid) return
    const newClient: ClientItem = {
      id: this.clients.length + 1,
      ...this.clientForm.value
    }
    this.clients = [...this.clients, newClient]
    this.filteredClients = [...this.clients]
    this.showDialog = false
  }

  deleteClient(client: ClientItem): void {
    if (confirm(`Delete ${client.companyName}?`)) {
      this.clients = this.clients.filter(c => c.id !== client.id)
      this.filteredClients = this.filteredClients.filter(c => c.id !== client.id)
    }
  }

  get canCreate(): boolean {
    return this.permissionService.canCreateClient()
  }

  get canDelete(): boolean {
    return this.permissionService.canDeleteClient()
  }
}