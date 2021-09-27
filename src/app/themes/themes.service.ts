import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoginService } from "../toolbarAndLogin/login.service";
import { User } from "../users/user";
import { WebService } from "../web.service";
import { Theme } from "./theme";

@Injectable({providedIn:'root'})
export class ThemesService {
  
  // selectedTheme: number = 0;
  currentTheme: number = 0;

  
  dummyTheme:Theme = {
    id: -1,
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
  }
  themes: Theme[] = [this.dummyTheme];

  
  constructor( private webService: WebService, private loginService: LoginService) { 
    console.log("in themes service constructor");
    loginService.loginThemeUpdate$.subscribe(
      (lastTheme: number) => {
        console.log(lastTheme);
        this.currentTheme = lastTheme;// this.selectedTheme = lastTheme;
        this.loadTheme();
    });

    this.GetThemesfromBackend();
  }
  GetThemesfromBackend() {
    this.webService.getThemes().subscribe( (res:any) => {
      this.themes = res.body;
      this.loadTheme();
      this.themesChanged();
    });
  }
  SetUserLastLoggedInTheme( currentUser:User, currentTheme: number ) {
    return this.webService.updateLastTheme(currentUser, currentTheme, this.loginService.checkedCredentials);
  }
  public updateTheme(themeToChange: Theme) {
    return this.webService.updateThemes(themeToChange, this.loginService.checkedCredentials);
  }
  
  public loadTheme(){
    this.previewTheme(this.themes[this.currentTheme]);

    // let docGeneral = document.querySelector(".general-styles");
    // console.log(docGeneral);
    // console.log(document.getElementsByClassName("general-styles"));
    // console.log(document.querySelector("general-styles"));
    // let newStyle2 = document.createElement("style");   //${this.themes[0].searchBarColor}; }
    // newStyle2.textContent = `
    //   *{ color: ${this.themes[this.currentTheme].textColor}; overflow:hidden; }
    //   body{ margin: 0px 0px 0px 0px; }
    //   .background-colorer{ background-color: ${this.themes[this.currentTheme].backgroundColor}; position: absolute; width:100vw; height:100vh; }
    //   .popup{ background-color: ${this.themes[this.currentTheme].backgroundColor}; }
    //   .tab-container{ background-color: ${this.themes[this.currentTheme].inactiveTabColor}; }
    //   .active{ background-color: ${this.themes[this.currentTheme].activeTabColor}; }
    //   .toolbar{ background-color: ${this.themes[this.currentTheme].toolbarColor}; }
    //   .search-container{ background-color: white}
    //   #search-input{ background-color: ${this.themes[this.currentTheme].searchBarColor}; }
    //   .login-container2{ background-color: ${this.themes[this.currentTheme].logoutButtonColor}; }
    //   .logout-container2{ background-color: ${this.themes[this.currentTheme].logoutButtonColor}; }
    //   .new-user-button{ background-color: ${this.themes[this.currentTheme].addUserColor}; }
    //   .theme-confirm-button{ background-color: ${this.themes[this.currentTheme].confirmThemeColor}; }
    // `;
    // docGeneral?.appendChild(newStyle2);
  }
  public previewTheme(previewingTheme:Theme){

    let docGeneral = document.querySelector(".general-styles");
    console.log(docGeneral);
    console.log(document.getElementsByClassName("general-styles"));
    console.log(document.querySelector("general-styles"));
    let newStyle2 = document.createElement("style");   //${this.themes[0].searchBarColor}; }
    newStyle2.textContent = `
      *{ color: ${previewingTheme.textColor}; overflow:hidden; }
      body{ margin: 0px 0px 0px 0px; }
      .background-colorer{ background-color: ${previewingTheme.backgroundColor}; position: absolute; width:100vw; height:100vh; }
      .popup{ background-color: ${previewingTheme.backgroundColor}; }
      .tab-container{ background-color: ${previewingTheme.inactiveTabColor}; }
      .active{ background-color: ${previewingTheme.activeTabColor}; }
      .toolbar{ background-color: ${previewingTheme.toolbarColor}; }
      .search-container{ background-color: white}
      #search-input{ background-color: ${previewingTheme.searchBarColor}; }
      .login-container2{ background-color: ${previewingTheme.logoutButtonColor}; }
      .logout-container2{ background-color: ${previewingTheme.logoutButtonColor}; }
      .new-user-button{ background-color: ${previewingTheme.addUserColor}; }
      .theme-confirm-button{ background-color: ${previewingTheme.confirmThemeColor}; }
    `;
    docGeneral?.appendChild(newStyle2);
  }
  private themeUpdateSource = new Subject<Theme[]>();
  themeUpdate$ = this.themeUpdateSource.asObservable();
  public themesChanged(){
    console.log("in theme changed");
    this.themeUpdateSource.next( this.themes );
  }

}