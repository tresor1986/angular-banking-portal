import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { ClientService } from '../../services/client.service'
import { ClientItem } from '../../models/client.model'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: false
})
export class ReportsComponent implements OnInit {
  clients: ClientItem[] = []
  statusChartData: any
  sectorChartData: any
  countryChartData: any
  chartOptions: any

  constructor(
    private clientService: ClientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients
        this.buildCharts()
        this.cdr.detectChanges()
      }
    })
  }

  buildCharts(): void {
    const statusCount = {
      active: this.clients.filter(c => c.status === 'active').length,
      pending: this.clients.filter(c => c.status === 'pending').length,
      inactive: this.clients.filter(c => c.status === 'inactive').length
    }

    this.statusChartData = {
      labels: ['Active', 'Pending', 'Inactive'],
      datasets: [{
        data: [statusCount.active, statusCount.pending, statusCount.inactive],
        backgroundColor: ['#2e7d32', '#f57f17', '#c62828'],
        hoverBackgroundColor: ['#388e3c', '#f9a825', '#d32f2f']
      }]
    }

    const sectors = [...new Set(this.clients.map(c => c.sector))]
    const sectorCounts = sectors.map(s => this.clients.filter(c => c.sector === s).length)

    this.sectorChartData = {
      labels: sectors,
      datasets: [{
        label: 'Clients by Sector',
        data: sectorCounts,
        backgroundColor: '#1976d2',
        hoverBackgroundColor: '#1565c0'
      }]
    }

    const countries = [...new Set(this.clients.map(c => c.country))]
    const countryCounts = countries.map(c => this.clients.filter(cl => cl.country === c).length)

    this.countryChartData = {
      labels: countries,
      datasets: [{
        label: 'Clients by Country',
        data: countryCounts,
        backgroundColor: '#7b1fa2',
        hoverBackgroundColor: '#6a1b9a'
      }]
    }

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  }
}