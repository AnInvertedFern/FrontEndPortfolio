import { OnInit } from "@angular/core";
import { LoginService } from "../toolbarAndLogin/login.service";
import { WebService } from "../web.service";


@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemesService]
})
export class ThemeComponent implements OnInit{
  LastUserUsedTheme: Theme
  selectedTheme: Theme
  currentTheme: Theme
  ArrayOfThemes: Theme[]

  constructor( private themeService: ThemeService, private loginService: LoginService) { 
    loginService.loginThemeUpdate$.subscribe(
      lastTheme => {this.currentTheme = lastTheme; this.selectTheme = lastTheme;
    });
  }
  public ngOnInit() {
    ArrayOfThemes = this.themeService.GetThemesfromBackend();

    
  }
  selectTheme( selectedTheme: Theme ) {
    this.selectTheme = selectedTheme;
  }
  confirmTheme() {
    this.currentTheme = this.selectedTheme;
    this.themeService.SetUserLastLoggedInTheme(this.loginService.currentUser, this.currentTheme); 
  }

}