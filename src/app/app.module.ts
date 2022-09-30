import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EstimationComponent } from './components/estimation/estimation.component';
import { MatDividerModule } from '@angular/material/divider';
import { ResultComponent } from './components/result/result.component';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    AppComponent,
    EstimationComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GuidedTourModule,
    ...MATERIAL_MODULES
  ],
  providers: [GuidedTourService],
  bootstrap: [AppComponent]
})
export class AppModule { }
