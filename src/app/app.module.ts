import { SideNavComponent } from './components/mobile/mobile-nav/side-nav/side-nav.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '@environments/environment';

// Services
import { SidenavService } from './services/shared/sidenav.service';

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
import { HomeComponent } from '@components/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductDetailsComponentComponent } from '@components/product-details-component/product-details-component.component';
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { NavbarComponent } from '@components/header/navbar/navbar.component';
import { SocialButtonComponent } from '@components/social-button/social-button.component';
import { NoAccessComponent } from '@components/no-access/no-access.component';
import { ValidationErrorsComponent } from '@components/forms/validation-errors/validation-errors.component';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { MobileNavComponent } from './components/mobile/mobile-nav/mobile-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

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
    MobileNavComponent,
    SideNavComponent,
    FooterComponent,
    CheckoutPageComponent,
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
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
