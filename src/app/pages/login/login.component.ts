import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(() => this.router.navigate(['/ilanlar']))
      .catch(err => alert('Giriş Hatası: ' + err.message));
  }

  onRegister() {
    this.authService.register(this.email, this.password)
      .then(() => alert('Kayıt başarılı!'))
      .catch(err => alert('Kayıt Hatası: ' + err.message));
  }
}
