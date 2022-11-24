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
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { InformationComponent } from './components/information/information.component';
import { SafePipe } from './pipes/safe.pipe';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
];
export const FIREBASE_MODULES = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFireStorageModule,
];

@NgModule({
  declarations: [AppComponent, EstimationComponent, ResultComponent, InformationComponent, SafePipe],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    GuidedTourModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ...MATERIAL_MODULES,
    ...FIREBASE_MODULES,
  ],
  providers: [GuidedTourService, AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {}
