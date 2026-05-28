export interface ClientItem {
  id: number
  companyName: string
  companyId: string
  sector: string
  country: string
  status: 'active' | 'inactive' | 'pending'
  manager: string
}

export interface ClientCriteria {
  companyName?: string
  sector?: string
  status?: string
  country?: string
}

export interface AccountItem {
  id: number
  clientId: number
  accountNumber: string
  type: 'current' | 'savings' | 'investment'
  balance: number
  currency: string
  openDate: string
}

export interface TransactionItem {
  id: number
  accountId: number
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

export interface DocumentItem {
  id: number
  clientId: number
  name: string
  type: string
  uploadDate: string
  status: 'verified' | 'pending' | 'rejected'
}

export interface ComplianceItem {
  id: number
  clientId: number
  checkType: string
  result: 'passed' | 'failed' | 'pending'
  date: string
  officer: string
}