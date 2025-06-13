import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilan } from '../models/ilan.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IlanService {
  private url = 'https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar.json';

  constructor(private http: HttpClient) { }

  getIlanlar(): Observable<Ilan[]> {
    return this.http.get<{ [key: string]: Ilan }>(this.url).pipe(
      map(veri => {
        const liste: Ilan[] = [];
        if (veri) {
          for (let key in veri) {
            const item = veri[key];
            if (item && item.baslik && item.fotoUrl) {
              liste.push({ ...item, id: key });
            }
          }
        }
        return liste;
      })
    );
  }

  postIlan(ilan: Ilan) {
    return this.http.post(this.url, ilan);
  }

  getIlanlarByUserId(uid: string): Observable<Ilan[]> {
    return this.getIlanlar().pipe(
      map(ilanlar => ilanlar.filter(i => i.userId === uid))
    );
  }

  deleteIlan(id: string) {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    return this.http.delete(url);
  }

  getIlanById(id: string): Observable<Ilan> {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    return this.http.get<Ilan>(url);
  }

  updateIlan(id: string, ilan: Ilan) {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    return this.http.put(url, ilan);
  }

  
}
