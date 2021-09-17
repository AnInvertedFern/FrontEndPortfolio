import { Component, OnInit } from "@angular/core";
import { LoginService } from "../toolbarAndLogin/login.service";
import { WebService } from "../web.service";
import { Theme } from "./theme";
import { ThemesService } from "./themes.service";


@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  // providers: [ThemesService]
})
export class ThemeComponent implements OnInit{
  // LastUserUsedTheme: Theme | undefined;
  themes: Theme[] = [];

  constructor( private themeService: ThemesService, private loginService: LoginService) { 
    console.log("in themes component constructor");
    loginService.loginThemeUpdate$.subscribe(
      (lastTheme: Theme) => {
        this.themeService.currentTheme = lastTheme.index; this.themeService.selectedTheme = lastTheme.index;
        this.themeService.loadTheme();
    });
    themeService.themeUpdate$.subscribe(
      (themes: Theme[]) => {
        this.themes = themes;
        this.themeService.loadTheme();
    });
    this.themeService.themesChanged();
  }
  public ngOnInit() {
    // this.themeService.GetThemesfromBackend().subscribe(this.setThemes);
    
    // this.copyThemesToService();
    
    let docThemes = document.querySelector(".themes");
    console.log(docThemes);
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .themes{ display:flex; flex-direction:column; }
      .theme-container{ display:flex; flex-direction:row; justify-content: space-around; margin: 10px 5px 10px 5px; }
      .theme{ height: 70px; width: 70px; border-radius: 70px; background-color: red; display:flex; flex-direction:column; }
      .theme-subcontainer{ display:flex; flex:1; flex-direction:row; justify-content: space-around; align-items: center; }
      .theme-marker{ height: 30px; width: 30px; border-radius: 30px; background-color: gold; }
      .preview-container{ display:flex; flex-direction:row; justify-content: center; }
      .theme-confirm-button{ background-color: gold; border-radius: 4px;  display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }
    `;
    docThemes?.appendChild(newStyle);

    this.themeService.loadTheme();
  }
  public copyThemesToService(){
    this.themeService.themes = this.themes;
  }
  public setThemes(themes: any){
    this.themes = themes;
    //add code to add the themes into css
    this.copyThemesToService();
  }
  selectTheme( selectedTheme: number ) {
    console.log(this.themeService.selectedTheme);
    this.themeService.selectedTheme = selectedTheme;
    console.log(this.themeService.selectedTheme);
  }
  confirmTheme() {
    console.log("confirming theme")
    this.themeService.currentTheme = this.themeService.selectedTheme;
    console.log(this.themeService.currentTheme);
    this.themeService.loadTheme();
    if (this.loginService.isLoggedin && this.loginService.currentUser !== undefined) {
      this.themeService.SetUserLastLoggedInTheme(this.loginService.currentUser, this.themes[this.themeService.currentTheme]);
    } 
  }

}