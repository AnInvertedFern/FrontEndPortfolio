@Injectable({providedIn:'root'})
export class themeService {
  
  
  constructor( private webService: WebService) { 
  }
  GetThemesfromBackend() {
    return this.webService.getThemes();
  }
  SetUserLastLoggedInTheme( currentUser:User, currentTheme: Theme ) {
    this.webService.updateLastTheme(currentUser, currentTheme);
  }

}