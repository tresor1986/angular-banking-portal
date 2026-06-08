import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing-module'
import { App } from './app'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'

import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Button } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { ClientDetailComponent } from './pages/client-detail/client-detail.component'
import { LayoutComponent } from './layout/layout.component'
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { Select } from 'primeng/select'
import {Dialog} from 'primeng/dialog'
import { provideHttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    App,
    LoginComponent,
    HomeComponent,
    ClientDetailComponent,
    LayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Card,
    InputText,
    Button,
    TableModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Select,
    Dialog,
   
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule {}