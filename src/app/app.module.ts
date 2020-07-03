import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialUiModule } from './material-ui/material-ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskTableComponent } from './task-table/task-table.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, TaskTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialUiModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
