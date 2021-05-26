import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '@environments/environment';
import { LightgalleryModule } from 'lightgallery/angular';

// Store
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from '@reducers/index';
import { ProductsEffects } from '@effects/products.effects';

// Services
import { SidenavService } from '@services/shared/sidenav/sidenav.service';
import { RoutingService } from '@services/core/routing.service';
import { ExcelService } from '@services/shared/excel.service';

// Swiper
import { SwiperModule } from "swiper/angular";

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
import { ProductCreateComponentComponent } from '@components/product-create-component/product-create-component.component';
import { NavbarComponent } from '@components/header/navbar/navbar.component';
import { SocialButtonComponent } from '@components/shared/social-button/social-button.component';
import { NoAccessComponent } from '@components/shared/no-access/no-access.component';
import { ValidationErrorsComponent } from '@components/shared/forms/validation-errors/validation-errors.component';
import { CarouselComponent } from '@components/shared/carousel/carousel.component';
import { FooterComponent } from '@components/footer/footer.component';
import { SideNavComponent } from '@components/mobile/side-nav/side-nav.component';
import { LinkComponent } from '@components/shared/link/link.component';
import { ShopComponent } from '@components/body/pages/shop/shop.component';
import { DialogComponent } from '@components/shared/dialog/dialog.component';
import { TableComponent } from '@components/shared/table/table.component';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from '@components/body/pages/cart/cart.component';
import { ProductComponent } from '@components/product/product.component';
import { UploadTaskComponent } from './components/shared/upload-task/upload-task.component';
import { AnimatedTextComponent } from './components/shared/animated-text/animated-text.component';
import { GoogleLoginComponent } from './components/core/login/google-login/google-login.component';
import { InspectionComponent } from './components/body/pages/inspection/inspection.component';
import { ClickStopPropogationDirective } from './directives/click-stop-propogation.directive';
import { LightGalleryComponent } from './components/shared/light-gallery/light-gallery.component';
import { DisplayCardComponent } from './components/shared/display-card/display-card.component';
import { AnimatedLineComponent } from './components/shared/animated-line/animated-line.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponentComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    SocialButtonComponent,
    NoAccessComponent,
    SideNavComponent,
    FooterComponent,
    LinkComponent,
    ShopComponent,
    DialogComponent,
    TableComponent,
    ValidationErrorsComponent,
    CarouselComponent,
    CartComponent,
    ProductComponent,
    UploadTaskComponent,
    AnimatedTextComponent,
    GoogleLoginComponent,
    InspectionComponent,
    ClickStopPropogationDirective,
    LightGalleryComponent,
    DisplayCardComponent,
    AnimatedLineComponent,
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
    LightgalleryModule,
    SwiperModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([ProductsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [SidenavService, DialogComponent, RoutingService, ExcelService,],
  bootstrap: [AppComponent],
})
export class AppModule { }
