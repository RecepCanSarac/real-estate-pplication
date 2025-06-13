import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IlanService } from 'src/app/services/ilan.service';
import { Ilan } from 'src/app/models/ilan.model';

@Component({
  selector: 'app-guncelle',
  templateUrl: './ilan-duzenle.component.html'
})
export class IlanDuzenleComponent implements OnInit {
  ilanId: string = '';
  ilan: Ilan = {
    baslik: '',
    aciklama: '',
    fiyat: 0,
    konum: '',
    tur: 'kiralik',
    fotoUrl: '',
    resimler: []
  };

  resimUrlListesi: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private ilanService: IlanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ilanId = this.route.snapshot.paramMap.get('id') || '';
    if (this.ilanId) {
      this.ilanService.getIlanById(this.ilanId).subscribe(data => {
        this.ilan = data;
        this.resimUrlListesi = data.resimler ? [...data.resimler] : [];
      });
    }
  }

  yeniResimUrl: string = "";

  resimEkle() {
    if (this.yeniResimUrl.trim()) {
      this.ilan.resimler = this.ilan.resimler || [];
      this.ilan.resimler.push(this.yeniResimUrl.trim());
      this.yeniResimUrl = "";
    }
  }

 resimSil(index: number) {
  if (this.ilan.resimler) {
    this.ilan.resimler.splice(index, 1);
  }
}


  ilanGuncelle() {
    const guncelIlan: Ilan = {
      ...this.ilan,
      fotoUrl: this.ilan.fotoUrl || this.resimUrlListesi[0] || '',
      resimler: this.resimUrlListesi
    };

    this.ilanService.updateIlan(this.ilanId, guncelIlan).subscribe(() => {
      alert('İlan güncellendi!');
      this.router.navigate(['/ilanlarim']);
    });
  }
}
