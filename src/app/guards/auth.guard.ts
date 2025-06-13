import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private auth: Auth, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = this.auth.currentUser;

    if (user) {
      return true;
    } else {
      alert("Bu sayfaya erişmek için giriş yapmalısınız.");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
