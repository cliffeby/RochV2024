import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { MembersCenterComponent } from './components/members/members-center/members-center.component';
import { ExternalApiComponent } from 'src/app/pages/external-api/external-api.component';
import { MembersMatListComponent } from './components/members/members-mat-list/members-mat-list.component';
import { MembersMatAddComponent } from './components/members/members-mat-add/members-mat-add.component';
import { MembersMatEditComponent } from './components/members/members-mat-edit/members-mat-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
  },
  {
    path: 'members',
    component: MembersMatListComponent,
    // canActivate: [ScopeGuard],
    data: { expectedScopes: ['read:members'] },
  },
  { path: 'add-members', component: MembersMatAddComponent },
  { path: 'edit-members/:_id', component: MembersMatEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
