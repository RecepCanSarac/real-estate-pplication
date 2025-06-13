import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ilan } from '../models/ilan.model';
import { map, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class IlanService {
  private url = 'https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar.json';

  constructor(private http: HttpClient, private auth: Auth) {}

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

  postIlan(ilan: Ilan): Observable<any> {
    const user: User | null = this.auth.currentUser;

    if (user) {
      const ilanWithUser = {
        ...ilan,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date().toISOString()
      };

      return this.http.post(this.url, ilanWithUser);
    } else {
      throw new Error('Kullanıcı oturumu yok. İlan eklemek için giriş yapılmalıdır.');
    }
  }

  getIlanlarByUserId(uid: string): Observable<Ilan[]> {
    return this.getIlanlar().pipe(
      map(ilanlar => ilanlar.filter(i => i.userId === uid))
    );
  }

  deleteIlan(id: string): Observable<any> {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    return this.http.delete(url);
  }

  getIlanById(id: string): Observable<Ilan> {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    return this.http.get<Ilan>(url);
  }

  updateIlan(id: string, ilan: Ilan): Observable<any> {
    const url = `https://emlak-projesi-e7aca-default-rtdb.firebaseio.com/ilanlar/${id}.json`;
    const user: User | null = this.auth.currentUser;
  
    if (user) {
      const ilanWithUser = {
        ...ilan,
        userId: user.uid,
        userEmail: user.email,
        updatedAt: new Date().toISOString() 
      };
  
      return this.http.put(url, ilanWithUser);
    } else {
      throw new Error('Güncelleme için giriş yapılmış olmalı.');
    }
  }
  
}
