import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MultiplyPipe } from './multiply.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiplyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
