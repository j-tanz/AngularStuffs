Instructions
* Main pieces:
  * Create an `AdminModule` and `AdminRoutingModule`
    - Add the following imports and `AdminComponent` declaration to `AdminModule`:
      - CommonModule
      - AdminRoutingModule
      - FormsModule
      - ReactiveFormsModule
      - NgbModule
    - Add the following code to the `AdminRoutingModule`
    ```ts
      import { NgModule } from '@angular/core';
      import { Routes, RouterModule } from '@angular/router';
      import { AdminComponent } from './admin.component';

      const routes: Routes = [
        { path: '', component: AdminComponent },
      ];

      @NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
      })
      export class AdminRoutingModule { }
    ```
  * Remove the `AdminComponent` from the `AppModule` `declarations` and add it to the `AdminModule`
  * Refactor the `AppRoutingModule`'s `/admin` route:
```typescript
 {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }