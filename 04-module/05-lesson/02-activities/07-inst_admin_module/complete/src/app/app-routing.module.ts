import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ItemsMasterComponent } from './items-master/items-master.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => {
      return import('./admin/admin.module').then(mod => mod.AdminModule)
    }
  },
  { path: 'items', component: ItemsMasterComponent },
  { path: 'items/:itemIndex', component: ItemDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
