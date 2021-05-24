import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// services
import { AuthGuard } from '@services/core/auth/auth.guard';

// components
import { HomeComponent } from '@components/body/pages/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { NoAccessComponent } from '@components/shared/no-access/no-access.component';
import { ShopComponent } from '@components/body/pages/shop/shop.component';
import { CartComponent } from '@components/body/pages/cart/cart.component';
import { InspectionComponent } from '@components/body/pages/inspection/inspection.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'product/:id', component: InspectionComponent },
  {
    path: 'create',
    component: ProductCreateComponentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'no-access', component: NoAccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
