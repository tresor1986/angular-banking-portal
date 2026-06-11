import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ClientService } from '../../services/client.service'
import { PermissionService } from '../../services/permission.service'
import { ClientItem, AccountItem, TransactionItem, DocumentItem, ComplianceItem } from '../../models/client.model'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  standalone: false
})
export class ClientDetailComponent implements OnInit {
  client: ClientItem | undefined
  accounts: AccountItem[] = []
  transactions: TransactionItem[] = []
  documents: DocumentItem[] = []
  compliance: ComplianceItem[] = []
  activeTab: string = '0'
  showEditDialog = false

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

  editForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private permissionService: PermissionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      companyName: ['', Validators.required],
      companyId: ['', Validators.required],
      sector: ['', Validators.required],
      country: ['', Validators.required],
      manager: ['', Validators.required],
      status: ['active', Validators.required]
    })
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.client = client
        this.accounts = this.clientService.getAccounts(id)
        this.transactions = this.clientService.getTransactions(this.accounts[0]?.id)
        this.documents = this.clientService.getDocuments(id)
        this.compliance = this.clientService.getCompliance(id)
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Erreur chargement client', err)
      }
    })
  }

  editClient(): void {
    if (!this.client) return
    this.editForm.patchValue({
      companyName: this.client.companyName,
      companyId: this.client.companyId,
      sector: this.client.sector,
      country: this.client.country,
      manager: this.client.manager,
      status: this.client.status
    })
    this.showEditDialog = true
  }

saveEdit(): void {
  if (this.editForm.invalid || !this.client) return
  const updated: ClientItem = {
    ...this.client,
    ...this.editForm.value
  }
  this.clientService.updateClient(this.client.id, updated).subscribe({
    next: (result) => {
      this.client = result
      this.showEditDialog = false
      this.cdr.detectChanges()
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client updated successfully'
      })
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update client'
      })
    }
  })
}

  get canViewCompliance(): boolean {
    return this.permissionService.canViewCompliance()
  }

  get canEdit(): boolean {
    return this.permissionService.canEditClient()
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }
}