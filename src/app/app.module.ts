import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EstimationComponent } from './components/estimation/estimation.component';
import { MatDividerModule } from '@angular/material/divider';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    AppComponent,
    EstimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
