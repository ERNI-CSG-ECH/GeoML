import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimationComponent } from './components/estimation/estimation.component';

const routes: Routes = [{path:'', component: EstimationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
