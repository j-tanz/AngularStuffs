import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { ItemCardComponent } from './items-master/item-card/item-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemSearchPipe } from './shared/item-search.pipe';
import { AddToCartButtonComponent } from './shared/add-to-cart-button/add-to-cart-button.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HTTPErrorInterceptor } from './shared/http-error.interceptor';
import { ErrorNotificationComponent } from './shared/error-notification/error-notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsMasterComponent,
    ItemDetailComponent,
    ItemCardComponent,
    PageNotFoundComponent,
    AddToCartButtonComponent,
    CheckoutComponent,
    ItemSearchPipe,
    ErrorNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HTTPErrorInterceptor, multi: true }],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ErrorNotificationComponent
  ]
})
export class AppModule { }
