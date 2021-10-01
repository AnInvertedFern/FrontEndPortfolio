import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Credentials, LoginService } from "../toolbarAndLogin/login.service";
import { User } from "../users/user";
import { UserReply, WebService } from "../web.service";
import { Theme } from "./theme";

@Injectable({providedIn:'root'})
export class ThemesService {
  
  currentTheme: number = 0;

  dummyTheme:Theme = {
    id: -1,
    inactiveTabColor: "",
    activeTabColor: "",
    toolbarColor: "",
    searchBarColor: "",
    loginButtonColor: "",
    backgroundColor: "",
    textColor: "",
    addUserColor: "",
    editUserColor: "",
    confirmThemeColor: "",
    
    refreshUserColor: "",
    popupColor: "",
    titleShadowColor: "",
    searchTitleShadowColor: "",
    footerSeperatorColor: "",
    loginShadowColor: "",
    inputColor: "",
    inputButtonColor: "",
  }
  themes: Theme[] = [this.dummyTheme];

  constructor( private webService: WebService, private loginService: LoginService) { 
    loginService.loginThemeUpdate$.subscribe(
      (lastTheme: number) => {
        this.currentTheme = lastTheme;
        this.loadTheme();
    });

    this.GetThemesfromBackend();
  }
  GetThemesfromBackend() : void {
    this.webService.getThemes().subscribe( (res:HttpResponse<Theme[]>) => {
      this.themes = <Theme[]> res.body;
      this.loadTheme();
      this.themesChanged();
    });
  }
  SetUserLastLoggedInTheme( currentUser:User, currentTheme: number ) : Observable<HttpResponse<UserReply>> {
    return this.webService.updateLastTheme(currentUser, currentTheme, <Credentials> this.loginService.checkedCredentials);
  }
  public updateTheme(themeToChange: Theme) : Observable<HttpResponse<Theme>> {
    return this.webService.updateThemes(themeToChange, <Credentials> this.loginService.checkedCredentials);
  }
  
  public loadTheme() : void {
    this.previewTheme(this.themes[this.currentTheme]);
  }
  public previewTheme(previewingTheme:Theme) : void {

    let docGeneral = document.querySelector(".general-styles");
    let newStyle2 = document.querySelector(".theme-style");
    if (newStyle2 === null) {
      newStyle2 = document.createElement("style");
      newStyle2.setAttribute("class", "theme-style");
    }
    // .background-colorer{ background-color: ${previewingTheme.backgroundColor}; position: absolute; width:100vw; height:100vh; }
    if (newStyle2 !== null) {
      document.body.style.backgroundColor = `${previewingTheme.backgroundColor}`;
      newStyle2.textContent = `
        *{ color: ${previewingTheme.textColor}; overflow:hidden; cursor: default; }
        body{ margin: 0px 0px 0px 0px; height:100vh;}
        app-root{ display:block; height:100%; overflow-y:scroll; }
        users{ display:block; }
        titles{ display:block; height:100%; overflow:visible; }
        themes{ display:block; }
        .tab-container{ background-color: ${previewingTheme.inactiveTabColor}; }
        .active{ background-color: ${previewingTheme.activeTabColor}; }
        .toolbar{ background-color: ${previewingTheme.toolbarColor}; }
        #search-input{ background-color: ${previewingTheme.searchBarColor}; }
        .login-container2{ background-color: ${previewingTheme.loginButtonColor}; }
        .logout-container2{ background-color: ${previewingTheme.loginButtonColor}; }
        .new-user-button{ background-color: ${previewingTheme.addUserColor}; }

        .refresh-users-button{ background-color: ${previewingTheme.refreshUserColor}; }
        .popup{ background-color: ${previewingTheme.popupColor}; }
        .title-column-left:hover, .title-column-right:hover { text-shadow: 0px 5px .1em ${previewingTheme.titleShadowColor}; }
        .search-item:hover { text-shadow: 0px 2px .5em ${previewingTheme.searchTitleShadowColor}; }
        .seperator{ background-color: ${previewingTheme.footerSeperatorColor}; }
        .login:hover, .logout:hover { text-shadow: 0px 3px .5em ${previewingTheme.loginShadowColor}; }
        .search-container{ background-color: white}
        .theme-confirm-button, #theme-update-button { background-color: ${previewingTheme.confirmThemeColor}; }
        input{ background-color: ${previewingTheme.inputColor}; }
        input[type="button"]{ background-color: ${previewingTheme.inputButtonColor}; }
        input[type="text"]:disabled{ background-color: lightgrey; }
      `;
      docGeneral?.appendChild(newStyle2);
    } else {
      throw console.error();
      ////////////////////////////////////////
      // Should be unreachable
    }
  }
  private themeUpdateSource = new Subject<Theme[]>();
  themeUpdate$ = this.themeUpdateSource.asObservable();
  public themesChanged() : void{
    this.themeUpdateSource.next( this.themes );
  }

}