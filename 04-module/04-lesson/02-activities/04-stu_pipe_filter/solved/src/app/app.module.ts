import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemCardComponent } from './items-master/item-card/item-card.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ItemSearchPipe } from './shared/item-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ItemDetailComponent,
    ItemsMasterComponent,
    NavbarComponent,
    ItemCardComponent,
    PageNotFoundComponent,
    ItemSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
