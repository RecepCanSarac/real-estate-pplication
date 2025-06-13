import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IlanlarComponent } from './pages/ilanlar/ilanlar.component';
import { YeniIlanComponent } from './pages/yeni-ilan/yeni-ilan.component';
import { IlanlarimComponent } from './pages/ilanlarim/ilanlarim.component';
import { IlanDuzenleComponent } from './pages/ilan-duzenle/ilan-duzenle.component';
import { AuthGuard } from './guards/auth.guard';
import { IlanDetayComponent } from './pages/ilan-detay/ilan-detay.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'ilanlar', component: IlanlarComponent },
  { path: 'yeni-ilan', component: YeniIlanComponent },
  { path: 'ilanlarim', component: IlanlarimComponent },
  { path: 'ilan-duzenle/:id', component: IlanDuzenleComponent },
  { path: 'yeni-ilan', component: YeniIlanComponent, canActivate: [AuthGuard] },
  { path: 'ilan/:id', component: IlanDetayComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
