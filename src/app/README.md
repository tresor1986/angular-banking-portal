# Angular Banking Portal

A professional enterprise banking portal built with Angular 19, PrimeNG v20, and connected to a REST API backend.

## Features

- **Authentication** — JWT-based login with role-based access control
- **Dashboard** — Statistics cards with client overview
- **Client Management** — Full CRUD (Create, Read, Update, Delete)
- **Server-side Pagination** — Paginated client list with server-side search
- **Role-based Permissions** — 4 roles: Admin, Manager, Compliance, ReadOnly
- **Client Detail** — Master-detail view with 4 tabs (Accounts, Transactions, Documents, Compliance)
- **Toast Notifications** — Success/error feedback on all operations
- **Responsive Layout** — Collapsible sidebar with header

## Tech Stack

- Angular 19 (NgModule)
- PrimeNG v20 + PrimeIcons
- TypeScript
- RxJS
- JWT Authentication
- HTTP Interceptor

## Roles & Permissions

| Role | New Client | Edit | Delete | Compliance Tab |
|---|---|---|---|---|
| Admin | ✅ | ✅ | ✅ | ✅ |
| Manager | ✅ | ✅ | ❌ | ❌ |
| Compliance | ❌ | ❌ | ❌ | ✅ |
| ReadOnly | ❌ | ❌ | ❌ | ❌ |

## Getting Started

### Prerequisites
- Node.js 20+
- Angular CLI
- Backend API running (see [banking-portal-api](https://github.com/tresor1986/banking-portal-api))

### Installation

```bash
npm install
ng serve
```

Open `http://localhost:4200`

## Demo Credentials

| Email | Password | Role |
|---|---|---|
| admin@bank.lu | 1234 | Admin |
| manager@bank.lu | 1234 | Manager |
| compliance@bank.lu | 1234 | Compliance |
| readonly@bank.lu | 1234 | ReadOnly |

## Related

- Backend API: [banking-portal-api](https://github.com/tresor1986/banking-portal-api)