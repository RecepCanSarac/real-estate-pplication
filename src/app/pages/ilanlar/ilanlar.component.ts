import { Component, OnInit } from '@angular/core';
import { IlanService } from 'src/app/services/ilan.service';
import { Ilan } from 'src/app/models/ilan.model';

@Component({
  selector: 'app-ilanlar',
  templateUrl: './ilanlar.component.html'
})
export class IlanlarComponent implements OnInit {
  ilanlar: Ilan[] = [];
  tumIlanlar: Ilan[] = [];

  // Filtre değişkenleri
  konumFilter: string = '';
  turFilter: string = '';
  fiyatMin: number | null = null;
  fiyatMax: number | null = null;
  odaFilter: string = '';
  odaSecenekleri = ['1+0', '1+1', '2+1', '3+1', '4+1', '4+2', '5+1'];

  constructor(private ilanService: IlanService) {}

  ngOnInit(): void {
    this.ilanService.getIlanlar().subscribe(data => {
      this.tumIlanlar = data;
      this.ilanlar = data;
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
}
