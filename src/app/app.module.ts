import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbarAndLogin/toolbar.component';
import { UserComponent } from './users/users.component';
import { TitlesComponent } from './titles/titles.component';
import { ThemeComponent } from './themes/themes.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    UserComponent,
    TitlesComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
