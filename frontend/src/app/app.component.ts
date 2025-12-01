import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background: linear-gradient(135deg, #004422 0%, #006633 100%); border-bottom: 2px solid #FFCC33;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">GMU Student Survey</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/surveys" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Survey List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/surveys/new" routerLinkActive="active">New Survey</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
    .navbar-brand {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .nav-link.active {
      color: #FFCC33 !important;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  title = 'Student Survey Application';
}
