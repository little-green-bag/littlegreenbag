import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '@environments/environment';

// Services
import { OrdersService } from './services/shared/orders.service';

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
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { HomeComponent } from '@components/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';
import { ProductDetailsComponentComponent } from './components/product-details-component/product-details-component.component';
import { ProductCreateComponentComponent } from './components/product-create-component/product-create-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component';
import { CarouselComponent } from './components/carousel/carousel.component';

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
    MatSnackBarModule,
    NguCarouselModule,
  ],
  providers: [OrdersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
