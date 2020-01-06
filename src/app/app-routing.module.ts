import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserAddEditComponent } from './Components/user-add-edit/user-add-edit.component';

const routes: Routes = [{ path: '', component: UserListComponent },
{ path: 'users/edit', component: UserAddEditComponent },
{ path: 'users', component: UserListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
