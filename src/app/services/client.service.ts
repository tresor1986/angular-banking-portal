import { Injectable } from '@angular/core'
import { ClientItem, AccountItem, TransactionItem, DocumentItem, ComplianceItem } from '../models/client.model'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients: ClientItem[] = [
    { id: 1, companyName: 'Alpha Investments S.A.', companyId: 'LU123456', sector: 'Investment Fund', country: 'Luxembourg', status: 'active', manager: 'Jean Müller' },
    { id: 2, companyName: 'Beta Capital Group', companyId: 'LU234567', sector: 'Private Banking', country: 'Luxembourg', status: 'active', manager: 'Sophie Weber' },
    { id: 3, companyName: 'Gamma Insurance Ltd', companyId: 'LU345678', sector: 'Insurance', country: 'Belgium', status: 'pending', manager: 'Marc Dupont' },
    { id: 4, companyName: 'Delta Fintech S.A.', companyId: 'LU456789', sector: 'Fintech', country: 'Luxembourg', status: 'active', manager: 'Anna Schmidt' },
    { id: 5, companyName: 'Epsilon Holdings', companyId: 'LU567890', sector: 'Investment Fund', country: 'Germany', status: 'inactive', manager: 'Pierre Martin' },
    { id: 6, companyName: 'Zeta Asset Management', companyId: 'LU678901', sector: 'Asset Management', country: 'Luxembourg', status: 'active', manager: 'Jean Müller' },
  ]

  getClients(): ClientItem[] {
    return this.clients
  }

  getClientById(id: number): ClientItem | undefined {
    return this.clients.find(c => c.id === id)
  }

  getAccounts(clientId: number): AccountItem[] {
    return [
      { id: 1, clientId, accountNumber: 'LU28 0019 4006 4475 0000', type: 'current', balance: 125000, currency: 'EUR', openDate: '2020-01-15' },
      { id: 2, clientId, accountNumber: 'LU43 0019 5567 3321 0000', type: 'investment', balance: 850000, currency: 'EUR', openDate: '2021-03-20' },
    ]
  }

  getTransactions(accountId: number): TransactionItem[] {
    return [
      { id: 1, accountId, date: '2026-05-20', description: 'Wire Transfer In', amount: 50000, type: 'credit' },
      { id: 2, accountId, date: '2026-05-18', description: 'Management Fee', amount: 1200, type: 'debit' },
      { id: 3, accountId, date: '2026-05-15', description: 'Dividend Payment', amount: 8500, type: 'credit' },
      { id: 4, accountId, date: '2026-05-10', description: 'Wire Transfer Out', amount: 25000, type: 'debit' },
    ]
  }

  getDocuments(clientId: number): DocumentItem[] {
    return [
      { id: 1, clientId, name: 'KYC Form 2026', type: 'KYC', uploadDate: '2026-01-10', status: 'verified' },
      { id: 2, clientId, name: 'Articles of Incorporation', type: 'Legal', uploadDate: '2025-06-15', status: 'verified' },
      { id: 3, clientId, name: 'Annual Report 2025', type: 'Financial', uploadDate: '2026-03-01', status: 'pending' },
    ]
  }

  getCompliance(clientId: number): ComplianceItem[] {
    return [
      { id: 1, clientId, checkType: 'AML Screening', result: 'passed', date: '2026-04-01', officer: 'Marie Hoffmann' },
      { id: 2, clientId, checkType: 'PEP Check', result: 'passed', date: '2026-04-01', officer: 'Marie Hoffmann' },
      { id: 3, clientId, checkType: 'Sanctions List', result: 'passed', date: '2026-03-15', officer: 'Tom Wagner' },
    ]
  }
}