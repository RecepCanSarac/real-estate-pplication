import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IlanService } from 'src/app/services/ilan.service';
import { Ilan } from 'src/app/models/ilan.model';

declare var bootstrap: any; // Bootstrap modal için şart

@Component({
  selector: 'app-ilan-detay',
  templateUrl: './ilan-detay.component.html'
})
export class IlanDetayComponent implements OnInit {
  ilan!: Ilan;
  aktifIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private ilanService: IlanService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ilanService.getIlanById(id).subscribe(data => {
        this.ilan = data;
      });
    }
  }



}