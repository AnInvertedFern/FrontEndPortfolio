import { Injectable } from "@angular/core";
import { User } from "../users/user";
import { WebService } from "../web.service";
import { Theme } from "./theme";

@Injectable({providedIn:'root'})
export class ThemesService {
  
  themes: Theme[] = [];
  
  constructor( private webService: WebService) { 
  }
  GetThemesfromBackend() {
    return this.webService.getThemes();
  }
  SetUserLastLoggedInTheme( currentUser:User, currentTheme: Theme ) {
    this.webService.updateLastTheme(currentUser, currentTheme);
  }

}