import { Component, OnInit } from "@angular/core";
import { LoginService } from "../toolbarAndLogin/login.service";
import { WebService } from "../web.service";
import { Theme } from "./theme";
import { ThemesService } from "./themes.service";


@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemesService]
})
export class ThemeComponent implements OnInit{
  // LastUserUsedTheme: Theme | undefined;
  selectedTheme: number = 0;
  currentTheme: number = 0;
  themes: Theme[] = [];

  constructor( private themeService: ThemesService, private loginService: LoginService) { 
    loginService.loginThemeUpdate$.subscribe(
      (lastTheme: Theme) => {
        this.currentTheme = lastTheme.index; this.selectedTheme = lastTheme.index;
    });
  }
  public ngOnInit() {
    // this.themeService.GetThemesfromBackend().subscribe(this.setThemes);
    this.themes.push(
      {
        index: -1,
        inactiveTabColor: "blue",
        activeTabColor: "yellow",
        toolbarColor: "red",
        searchBarColor: "white",
        logoutButtonColor: "purple",
        backgroundColor: "black",
        textColor: "white",
        addUserColor: "white",
        editUserColor: "green",
        confirmThemeColor: "red",
      }
    );
    
    let docUsers = document.querySelector("themes");
    let newStyle = document.createElement("style");
    newStyle.textContent = "\
      .themes{ display:flex; flex-direction:column; }\
      .theme-container{ display:flex; flex-direction:row; justify-content: space-around; margin: 10px 5px 10px 5px; }\
      .theme{ height: 70px; width: 70px; border-radius: 70px; background-color: red; display:flex; flex-direction:column; }\
      .theme-subcontainer{ display:flex; flex:1; flex-direction:row; justify-content: space-around; align-items: center; }\
      .theme-marker{ height: 30px; width: 30px; border-radius: 30px; background-color: gold; }\
      .preview-container{ display:flex; flex-direction:row; justify-content: center; }\
      .theme-confirm-button{ background-color: gold; border-radius: 4px;  display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }\
    ";
    docUsers?.appendChild(newStyle);
  }
  public setThemes(themes: any){
    this.themes = themes;
    //add code to add the themes into css
  }
  selectTheme( selectedTheme: number ) {
    this.selectedTheme = selectedTheme;
  }
  confirmTheme() {
    this.currentTheme = this.selectedTheme;
    if (this.loginService.isLoggedin && this.loginService.currentUser !== undefined) {
      this.themeService.SetUserLastLoggedInTheme(this.loginService.currentUser, this.themes[this.currentTheme]);
    } 
  }

}