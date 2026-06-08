import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
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
    private fb: FormBuilder,
     private cdr: ChangeDetectorRef
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
  this.clientService.getClients().subscribe({
    next: (clients) => {
      this.clients = clients
      this.filteredClients = [...clients]
      this.cdr.detectChanges()
    },
    error: (err) => {
      console.error('Erreur chargement clients', err)
    }
  })
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
    id: 0,
    ...this.clientForm.value
  }
  this.clientService.addClient(newClient).subscribe({
    next: (created) => {
      this.clients = [...this.clients, created]
      this.filteredClients = [...this.clients]
      this.showDialog = false
    },
    error: (err) => {
      console.error('Erreur création client', err)
    }
  })
}

deleteClient(client: ClientItem): void {
  if (confirm(`Delete ${client.companyName}?`)) {
    this.clientService.deleteClient(client.id).subscribe({
      next: () => {
        this.clients = this.clients.filter(c => c.id !== client.id)
        this.filteredClients = this.filteredClients.filter(c => c.id !== client.id)
      },
      error: (err) => {
        console.error('Erreur suppression client', err)
      }
    })
  }
}

  get canCreate(): boolean {
    return this.permissionService.canCreateClient()
  }

  get canDelete(): boolean {
    return this.permissionService.canDeleteClient()
  }
}