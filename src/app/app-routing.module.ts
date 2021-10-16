import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DummyComponent } from './dummy.component';
import { ThemeComponent } from './themes/themes.component';
import { TitlesComponent } from './titles/titles.component';
import { UserComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'titles', component: TitlesComponent },
  { path: 'themes', component: ThemeComponent },
  { path: 'dummy-component', component: DummyComponent },
  { path: '',   redirectTo: 'users', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }