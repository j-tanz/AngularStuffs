import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './list/list.component';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
