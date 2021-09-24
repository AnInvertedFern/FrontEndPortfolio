import { Component, OnDestroy, OnInit } from "@angular/core";
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
export class ThemeComponent implements OnInit, OnDestroy {
  // LastUserUsedTheme: Theme | undefined;
  
  dummyTheme:Theme = {
    index: -1,
    inactiveTabColor: "",
    activeTabColor: "",
    toolbarColor: "",
    searchBarColor: "",
    logoutButtonColor: "",
    backgroundColor: "",
    textColor: "",
    addUserColor: "",
    editUserColor: "",
    confirmThemeColor: "",
  };
  themes: Theme[] = [];
  
  selectedTheme: number = this.themeService.currentTheme;
  selectedThemeCopy:Theme = {
    index: -1,
    inactiveTabColor: "",
    activeTabColor: "",
    toolbarColor: "",
    searchBarColor: "",
    logoutButtonColor: "",
    backgroundColor: "",
    textColor: "",
    addUserColor: "",
    editUserColor: "",
    confirmThemeColor: "",
  };

  constructor( private themeService: ThemesService, private loginService: LoginService) { 
    console.log("in themes component constructor");
  }
  public ngOnInit() {
    this.themeService.themeUpdate$.subscribe(
      (themes: Theme[]) => {
        this.themes = themes;
        this.themeService.loadTheme();
    });
    this.themeService.GetThemesfromBackend();
    this.themeService.themesChanged();

    // this.themeService.GetThemesfromBackend().subscribe(this.setThemes);
    
    // this.copyThemesToService();
    
    let docThemes = document.querySelector(".themes");
    console.log(docThemes);
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .themes{ display:flex; flex-direction:column; }
      .theme-container{ display:flex; flex-direction:row; justify-content: space-around; margin: 10px 5px 10px 5px; }
      .theme-border-container{ display:flex; align-items: center; justify-content: center;  margin: 20px 5px 20px 5px; height: 80px; width: 80px; border-radius: 30px; box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray; }
      .theme-border-container:hover{ transform: translateY(-10px); }

      .theme{ height: 70px; width: 70px; border-radius: 70px; background-color: red; display:flex; flex-direction:column; }
      .theme-subcontainer{ display:flex; flex:1; flex-direction:row; justify-content: space-around; align-items: center; }
      .theme-marker{ height: 30px; width: 30px; border-radius: 30px; background-color: gold; }
      .preview-container{ display:flex; flex-direction:row; justify-content: center; }
      .theme-confirm-button{ background-color: gold; border-radius: 4px; display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }
      #theme-update-button{ background-color: gold; border-radius: 4px; display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }
      .theme-details-container{ display:flex; align-items:center; justify-content: center; height: 30em; width: 100%; margin: 10px 30px 10px 30px; }
      .theme-details-subcontainer{ display:flex; align-items:center; justify-content: center; flex-direction:column; border: 2px solid black; height: 50%; width: 30%; }

      
      .disable-button{ visibility:hidden; }
    `;
    docThemes?.appendChild(newStyle);

    this.themeService.loadTheme();
    this.selectTheme(this.selectedTheme);

    
    let docThemeUpdate = document.querySelector("#theme-update-button");
    if (this.loginService.isLoggedin && this.loginService.currentUser &&  this.loginService.isAdmin) {
      docThemeUpdate?.removeAttribute("disabled");
      docThemeUpdate?.setAttribute("class", "");
    } else {
      docThemeUpdate?.setAttribute("disabled", "");
      docThemeUpdate?.setAttribute("class", "disable-button");
    }

  }
  public ngOnDestroy(){
    this.themeService.loadTheme();
  }
  // public copyThemesToService(){
  //   this.themeService.themes = this.themes;
  // }
  public setThemes(themes: any){
    this.themes = themes;
    //add code to add the themes into css
    // this.copyThemesToService();
  }
  selectTheme( selectedTheme: number ) {
    // console.log(this.themeService.selectedTheme);
    // this.themeService.selectedTheme = selectedTheme;
    this.selectedTheme = selectedTheme;
    this.selectedThemeCopy = {
      index: -1,
      inactiveTabColor: "",
      activeTabColor: "",
      toolbarColor: "",
      searchBarColor: "",
      logoutButtonColor: "",
      backgroundColor: "",
      textColor: "",
      addUserColor: "",
      editUserColor: "",
      confirmThemeColor: "",
    };
    this.selectedThemeCopy =  Object.assign(this.selectedThemeCopy, this.themes[this.selectedTheme]);
    // Object.entries(this.themes[this.selectedTheme]);
    console.log(this.selectedThemeCopy);
    // console.log(this.themeService.selectedTheme);
    this.themeService.previewTheme(this.selectedThemeCopy);
  }
  confirmTheme() {
    console.log("confirming theme")
    this.themeService.currentTheme = this.selectedTheme;//this.themeService.selectedTheme;
    console.log(this.themeService.currentTheme);
    this.themeService.loadTheme();
    if (this.loginService.isLoggedin && this.loginService.currentUser !== undefined) {
      this.themeService.SetUserLastLoggedInTheme(this.loginService.currentUser, this.themeService.currentTheme).subscribe( (res:any) => {
        console.log("updated current use last theme");
        console.log(res);
      });
    } 
    this.selectTheme(this.selectedTheme);
  }
  updateTheme() {
    console.log("updating theme")
    if (true){//this.loginService.isLoggedin && this.loginService.currentUser !== undefined && this.loginService.isAdmin === true) {
      this.themeService.updateTheme(this.selectedThemeCopy).subscribe( (res:any) => {
        console.log("updated theme");
        console.log(res);
        this.confirmTheme();
        this.themeService.GetThemesfromBackend();
      });
    } 
  }

}