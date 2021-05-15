import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';

// Services
import { SidenavService } from './services/shared/sidenav/sidenav.service';

// Swiper
import { NguCarouselModule } from '@ngu/carousel';

// Material
import { MaterialModule } from './modules/material/material.module';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

// Components
import { HomeComponent } from '@components/body/pages/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductDetailsComponentComponent } from '@components/product-details-component/product-details-component.component';
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { NavbarComponent } from '@components/header/navbar/navbar.component';
import { SocialButtonComponent } from '@components/shared/social-button/social-button.component';
import { NoAccessComponent } from '@components/shared/no-access/no-access.component';
import { ValidationErrorsComponent } from '@components/shared/forms/validation-errors/validation-errors.component';
import { CarouselComponent } from '@components/shared/carousel/carousel.component';
import { FooterComponent } from '@components/footer/footer.component';
import { SideNavComponent } from '@components/mobile/side-nav/side-nav.component';
import { LinkComponent } from '@components/shared/link/link.component';
import { CheckoutComponent } from '@components/body/pages/checkout/checkout.component';
import { ShopComponent } from '@components/body/pages/shop/shop.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { TableComponent } from './components/shared/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponentComponent,
    ProductCreateComponentComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    SocialButtonComponent,
    NoAccessComponent,
    ValidationErrorsComponent,
    CarouselComponent,
    SideNavComponent,
    FooterComponent,
    LinkComponent,
    CheckoutComponent,
    ShopComponent,
    DialogComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    NguCarouselModule,
    EffectsModule,
  ],
  providers: [SidenavService, DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
