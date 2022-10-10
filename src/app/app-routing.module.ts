import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimationComponent } from './components/estimation/estimation.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game', component: EstimationComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
