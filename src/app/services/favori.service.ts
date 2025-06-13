import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoriService {
  private baseUrl = 'https://emlak-projesi-e7aca-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getUserId(): string {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Kullanıcı oturumu yok.');
    return user.uid;
  }

  favoriEkle(ilanId: string) {
    const uid = this.getUserId();
    const url = `${this.baseUrl}/favoriler/${uid}/${ilanId}.json`;
    return this.http.put(url, true);
  }

  favoriKaldir(ilanId: string) {
    const uid = this.getUserId();
    const url = `${this.baseUrl}/favoriler/${uid}/${ilanId}.json`;
    return this.http.delete(url);
  }

  getFavoriIlanIdleri(): Observable<string[]> {
    const uid = this.getUserId();
    const url = `${this.baseUrl}/favoriler/${uid}.json`;
    return this.http.get<{ [key: string]: boolean }>(url).pipe(
      map(veri => veri ? Object.keys(veri) : [])
    );
  }

  isFavori(ilanId: string): Observable<boolean> {
    const uid = this.getUserId();
    const url = `${this.baseUrl}/favoriler/${uid}/${ilanId}.json`;
    return this.http.get<boolean>(url).pipe(
      map(veri => veri === true)
    );
  }
}
