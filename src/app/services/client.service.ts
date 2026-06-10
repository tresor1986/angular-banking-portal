import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { ClientItem, AccountItem, TransactionItem, DocumentItem, ComplianceItem } from '../models/client.model'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7281/api/client'

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientItem[]> {
    return this.http.get<ApiResponse<ClientItem[]>>(this.apiUrl).pipe(
      map(response => response.data)
    )
  }

  getClientById(id: number): Observable<ClientItem> {
    return this.http.get<ApiResponse<ClientItem>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    )
  }

  addClient(client: ClientItem): Observable<ClientItem> {
    return this.http.post<ApiResponse<ClientItem>>(this.apiUrl, client).pipe(
      map(response => response.data)
    )
  }

  deleteClient(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    )
  }

  // Ces méthodes restent en mock pour l'instant
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

  getClientsPaginated(page: number, pageSize: number, search: string = ''): Observable<any> {
  const params = `?page=${page}&pageSize=${pageSize}&search=${search}`
  return this.http.get<any>(`${this.apiUrl}/paginated${params}`).pipe(
    map(response => response.data)
  )
}
}