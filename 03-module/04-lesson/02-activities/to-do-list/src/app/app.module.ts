import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
