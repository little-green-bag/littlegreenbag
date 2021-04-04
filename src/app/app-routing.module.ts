import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { ProductDetailsComponentComponent } from '@components/product-details-component/product-details-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponentComponent },
  { path: 'create', component: ProductCreateComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
