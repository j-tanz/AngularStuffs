import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

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
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
