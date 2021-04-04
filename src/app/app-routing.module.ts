import { AuthGuard } from './services/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { ProductDetailsComponentComponent } from '@components/product-details-component/product-details-component.component';
import { NoAccessComponent } from '@components/no-access/no-access.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products/:id', component: ProductDetailsComponentComponent },
  { path: 'create', component: ProductCreateComponentComponent },
  { path: 'no-access', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
