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
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InformationComponent } from './components/information/information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export const MATERIAL_MODULES = [MatCardModule, MatButtonModule, MatDividerModule, MatDialogModule, MatIconModule];

@NgModule({
  declarations: [AppComponent, EstimationComponent, ResultComponent, InformationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GuidedTourModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ...MATERIAL_MODULES,
  ],
  providers: [GuidedTourService],
  bootstrap: [AppComponent],
})
export class AppModule {}
