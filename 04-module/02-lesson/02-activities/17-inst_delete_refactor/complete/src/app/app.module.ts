import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCardComponent } from './items-master/item-card/item-card.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ItemDetailComponent,
    ItemsMasterComponent,
    NavbarComponent,
    ItemCardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
