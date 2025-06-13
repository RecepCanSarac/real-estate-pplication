import { Component, OnInit } from '@angular/core';
import { IlanService } from 'src/app/services/ilan.service';
import { Ilan } from 'src/app/models/ilan.model';
import { FavoriService } from 'src/app/services/favori.service';

@Component({
  selector: 'app-ilanlar',
  templateUrl: './ilanlar.component.html'
})
export class IlanlarComponent implements OnInit {
  ilanlar: Ilan[] = [];
  tumIlanlar: Ilan[] = [];

  konumFilter: string = '';
  turFilter: string = '';
  fiyatMin: number | null = null;
  fiyatMax: number | null = null;
  odaFilter: string = '';
  odaSecenekleri = ['1+0', '1+1', '2+1', '3+1', '4+1', '4+2', '5+1'];

  favoriMi: { [ilanId: string]: boolean } = {};

  constructor(
    private ilanService: IlanService,
    private favoriService: FavoriService
  ) {}

  ngOnInit(): void {
    this.ilanService.getIlanlar().subscribe(data => {
      this.tumIlanlar = data;
      this.ilanlar = data;
      this.yukleFavoriler();
    });
  }

  filtrele() {
    let filtrelenmis = this.tumIlanlar;

    if (this.konumFilter) {
      filtrelenmis = filtrelenmis.filter(i =>
        i.konum.toLowerCase().includes(this.konumFilter.toLowerCase())
      );
    }

    if (this.turFilter) {
      filtrelenmis = filtrelenmis.filter(i => i.tur === this.turFilter);
    }

    if (this.fiyatMin !== null) {
      filtrelenmis = filtrelenmis.filter(i => i.fiyat >= this.fiyatMin!);
    }

    if (this.fiyatMax !== null) {
      filtrelenmis = filtrelenmis.filter(i => i.fiyat <= this.fiyatMax!);
    }

    if (this.odaFilter) {
      filtrelenmis = filtrelenmis.filter(i =>
        i.odaSayisi?.toString() === this.odaFilter
      );
    }

    this.ilanlar = filtrelenmis;
  }

  resetFiltre() {
    this.konumFilter = '';
    this.turFilter = '';
    this.fiyatMin = null;
    this.fiyatMax = null;
    this.odaFilter = '';
    this.ilanlar = [...this.tumIlanlar];
  }

  // 🔽 Favori işlemleri
  yukleFavoriler() {
    this.favoriService.getFavoriIlanIdleri().subscribe(ids => {
      this.favoriMi = {};
      ids.forEach(id => this.favoriMi[id] = true);
    });
  }

  toggleFavori(ilanId: string) {
    if (this.favoriMi[ilanId]) {
      this.favoriService.favoriKaldir(ilanId).subscribe(() => {
        this.favoriMi[ilanId] = false;
      });
    } else {
      this.favoriService.favoriEkle(ilanId).subscribe(() => {
        this.favoriMi[ilanId] = true;
      });
    }
  }
}
