import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
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
  loading = false

  // Pagination serveur
  totalRecords = 0
  pageSize = 5
  currentPage = 1

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
    this.loadClients()
  }

loadClients(): void {
  this.loading = true
  this.clientService.getClientsPaginated(this.currentPage, this.pageSize, this.searchText).subscribe({
    next: (result) => {
      this.clients = result.items
      this.filteredClients = result.items
      this.totalRecords = result.totalCount
      this.loading = false
      this.cdr.detectChanges()
    },
    error: (err) => {
      console.error('Erreur chargement clients', err)
      this.loading = false
      this.cdr.detectChanges()
    }
  })
}
  onSearch(): void {
    this.currentPage = 1
    this.loadClients()
  }

onPageChange(event: any): void {
  this.currentPage = event.first / event.rows + 1
  this.pageSize = event.rows
  this.loadClients()
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
      next: () => {
        this.loadClients()
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
          this.loadClients()
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