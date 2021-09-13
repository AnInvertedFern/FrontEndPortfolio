import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeComponent } from './themes/themes.component';
import { TitlesComponent } from './titles/titles.component';
import { UserComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users-component', component: UserComponent },
  { path: 'titles-component', component: TitlesComponent },
  { path: 'themes-component', component: ThemeComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }