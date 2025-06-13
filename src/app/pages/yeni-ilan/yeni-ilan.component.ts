import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ilan } from 'src/app/models/ilan.model';
import { IlanService } from 'src/app/services/ilan.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-yeni-ilan',
  templateUrl: './yeni-ilan.component.html'
})
export class YeniIlanComponent {
  ilan: Ilan = {
    baslik: '',
    aciklama: '',
    fiyat: 0,
    konum: '',
    tur: 'kiralik',
    fotoUrl: '',
    odaSayisi: 1
  };

  // ✅ Yeni eklenen görselleri tutan liste
  resimler: string[] = [];

  // ✅ Input alanından alınan yeni URL
  yeniResimUrl: string = '';

  constructor(
    private ilanService: IlanService,
    private authService: AuthService,
    private router: Router
  ) {}

  resimEkle() {
    if (this.yeniResimUrl && this.yeniResimUrl.startsWith('http')) {
      this.resimler.push(this.yeniResimUrl);
      this.yeniResimUrl = '';
    }
  }

  resimSil(index: number) {
    this.resimler.splice(index, 1);
  }

  ilanEkle() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const yeniIlan = {
      ...this.ilan,
      userId: currentUser.uid,
      resimler: this.resimler,
      fotoUrl: this.ilan.fotoUrl || this.resimler[0] || ''
    };

    this.ilanService.postIlan(yeniIlan).subscribe(() => {
      alert('İlan başarıyla eklendi!');
      this.router.navigate(['/ilanlar']);
    });
  }
}
