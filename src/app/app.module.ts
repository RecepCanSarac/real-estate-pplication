import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';

import { LoginComponent } from './pages/login/login.component';
import { IlanlarComponent } from './pages/ilanlar/ilanlar.component';
import { HttpClientModule } from '@angular/common/http';
import { YeniIlanComponent } from './pages/yeni-ilan/yeni-ilan.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { IlanlarimComponent } from './pages/ilanlarim/ilanlarim.component';
import { IlanDuzenleComponent } from './pages/ilan-duzenle/ilan-duzenle.component';
import { IlanDetayComponent } from './pages/ilan-detay/ilan-detay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IlanlarComponent,
    YeniIlanComponent,
    NavbarComponent,
    IlanlarimComponent,
    IlanDuzenleComponent,
    IlanDetayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RegisterComponent
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
