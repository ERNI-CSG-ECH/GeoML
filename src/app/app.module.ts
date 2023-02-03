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
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { InformationComponent } from './components/information/information.component';
import { SafePipe } from './pipes/safe.pipe';
import { environment } from '../environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { EstimationValuesComponent } from './components/estimation-values/estimation-values.component';
import { EstimationImageComponent } from './components/estimation-image/estimation-image.component';
import { HeaderComponent } from './components/header/header.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { ButtonComponent } from './components/button/button.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { MapComponent } from './components/map/map.component';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
];
export const FIREBASE_MODULES = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  AngularFireStorageModule,
];

@NgModule({
  declarations: [
    AppComponent,
    EstimationComponent,
    ResultComponent,
    InformationComponent,
    SafePipe,
    ResultCardComponent,
    EstimationValuesComponent,
    EstimationImageComponent,
    HeaderComponent,
    ExplanationComponent,
    ButtonComponent,
    TutorialComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    ...MATERIAL_MODULES,
    ...FIREBASE_MODULES,
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {}
