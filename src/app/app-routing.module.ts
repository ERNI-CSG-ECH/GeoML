import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimationComponent } from './components/estimation/estimation.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {path:'', component: EstimationComponent},
  {path:'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
