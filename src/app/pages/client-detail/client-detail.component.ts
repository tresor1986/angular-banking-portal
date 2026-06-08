import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ClientService } from '../../services/client.service'
import { PermissionService } from '../../services/permission.service'
import { ClientItem, AccountItem, TransactionItem, DocumentItem, ComplianceItem } from '../../models/client.model'

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private permissionService: PermissionService
  ) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'))
  
  this.clientService.getClientById(id).subscribe({
    next: (client) => {
      this.client = client
      this.accounts = this.clientService.getAccounts(id)
      this.transactions = this.clientService.getTransactions(this.accounts[0]?.id)
      this.documents = this.clientService.getDocuments(id)
      this.compliance = this.clientService.getCompliance(id)
    },
    error: (err) => {
      console.error('Erreur chargement client', err)
    }
  })
}

  get canViewCompliance(): boolean {
    return this.permissionService.canViewCompliance()
  }

  get canEdit(): boolean {
    return this.permissionService.canEditClient()
  }

  editClient(): void {
    alert('Edit form coming soon!')
  }

  goBack(): void {
    this.router.navigate(['/home'])
  }
}