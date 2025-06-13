import { Component, OnInit } from '@angular/core';
import { IlanService } from 'src/app/services/ilan.service';
import { AuthService } from 'src/app/services/auth.service';
import { Ilan } from 'src/app/models/ilan.model';

@Component({
  selector: 'app-ilanlarim',
  templateUrl: './ilanlarim.component.html'
})
export class IlanlarimComponent implements OnInit {
  ilanlar: Ilan[] = [];

  constructor(private ilanService: IlanService, private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.ilanService.getIlanlarByUserId(currentUser.uid).subscribe(data => {
      this.ilanlar = data;
    });
  }

  ilanSil(id: string) {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      this.ilanService.deleteIlan(id).subscribe(() => {
        this.ilanlar = this.ilanlar.filter(i => i.id !== id);
      });
    }
  }
}
