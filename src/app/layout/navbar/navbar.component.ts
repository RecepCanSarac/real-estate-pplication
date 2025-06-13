import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.authService.logout();
  }
}
