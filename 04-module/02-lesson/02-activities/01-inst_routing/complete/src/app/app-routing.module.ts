import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ItemsMasterComponent } from './items-master/items-master.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'items', component: ItemsMasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
