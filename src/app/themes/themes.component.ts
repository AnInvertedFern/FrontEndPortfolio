import { HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "../toolbarAndLogin/login.service";
  import { UserReply, WebService } from "../web.service";
  import { Theme } from "./theme";
import { ThemesService } from "./themes.service";


@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
})
export class ThemeComponent implements OnInit, OnDestroy {
  
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
    
    refreshUserColor: "",
    popupColor: "",
    titleShadowColor: "",
    searchTitleShadowColor: "",
    footerSeperatorColor: "",
    loginShadowColor: "",
    inputColor: "",
    inputButtonColor: "",
  };
  themes: Theme[] = [this.dummyTheme];
  
  selectedTheme: number = this.themeService.currentTheme;
  selectedThemeCopy:Theme = {
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
    
    refreshUserColor: "",
    popupColor: "",
    titleShadowColor: "",
    searchTitleShadowColor: "",
    footerSeperatorColor: "",
    loginShadowColor: "",
    inputColor: "",
    inputButtonColor: "",
  };

  constructor( private themeService: ThemesService, private loginService: LoginService) { 
  }
  public ngOnInit() : void {
    this.themeService.themeUpdate$.subscribe(
      (themes: Theme[]) => {
        this.themes = themes;
        this.themeService.loadTheme();
        this.setThemeForm();
    });
    this.themeService.GetThemesfromBackend();
    this.themeService.themesChanged(); //Is Necessary
    
    let docThemes = document.querySelector(".themes");
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
      .theme-confirm-button{ border-radius: 4px; display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }
      #theme-update-button{ border-radius: 4px; display:flex; align-items: center; justify-content: center; height: 30px; width: 70px; margin: 10px 30px 10px 30px; }
      
      .theme-confirm-button:hover { transform: translatex(-.1rem); }
      #theme-update-button:hover { transform: translatex(-.1rem); }
      
      .theme-details-container{ display:flex; align-items:center; justify-content: center; margin: 10px 30px 10px 30px; }
      .theme-details-subcontainer{ display:flex; align-items:center; justify-content: center; flex-direction:column; border: 2px solid black; }

      .disable-button{ visibility:hidden; }
    `;
    docThemes?.appendChild(newStyle);
    
    let docThemeFormInactiveTabColor = document.querySelector("#theme-detail-inactiveTabColor");
    let docThemeFormActiveTabColor = document.querySelector("#theme-detail-activeTabColor");
    let docThemeFormToolbarColor = document.querySelector("#theme-detail-toolbarColor");
    let docThemeFormSearchBarColor = document.querySelector("#theme-detail-searchBarColor");
    let docThemeFormLogoutButtonColor = document.querySelector("#theme-detail-logoutButtonColor");
    let docThemeFormBackgroundColor = document.querySelector("#theme-detail-backgroundColor");
    let docThemeFormTextColor = document.querySelector("#theme-detail-textColor");
    let docThemeFormAddUserColor = document.querySelector("#theme-detail-addUserColor");
    let docThemeFormEditUserColor = document.querySelector("#theme-detail-editUserColor");
    let docThemeFormConfirmThemeColor = document.querySelector("#theme-detail-confirmThemeColor");
    if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.isAdmin) {
      docThemeFormInactiveTabColor?.removeAttribute("disabled");
      docThemeFormActiveTabColor?.removeAttribute("disabled");
      docThemeFormToolbarColor?.removeAttribute("disabled");
      docThemeFormSearchBarColor?.removeAttribute("disabled");
      docThemeFormLogoutButtonColor?.removeAttribute("disabled");
      docThemeFormBackgroundColor?.removeAttribute("disabled");
      docThemeFormTextColor?.removeAttribute("disabled");
      docThemeFormAddUserColor?.removeAttribute("disabled");
      docThemeFormEditUserColor?.removeAttribute("disabled");
      docThemeFormConfirmThemeColor?.removeAttribute("disabled");
    } else {
      docThemeFormInactiveTabColor?.setAttribute("disabled", "");
      docThemeFormActiveTabColor?.setAttribute("disabled", "");
      docThemeFormToolbarColor?.setAttribute("disabled", "");
      docThemeFormSearchBarColor?.setAttribute("disabled", "");
      docThemeFormLogoutButtonColor?.setAttribute("disabled", "");
      docThemeFormBackgroundColor?.setAttribute("disabled", "");
      docThemeFormTextColor?.setAttribute("disabled", "");
      docThemeFormAddUserColor?.setAttribute("disabled", "");
      docThemeFormEditUserColor?.setAttribute("disabled", "");
      docThemeFormConfirmThemeColor?.setAttribute("disabled", "");
    }

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
  public ngOnDestroy() : void {
    this.themeService.loadTheme();
  }
  private setThemeForm() : void {
    this.selectedThemeCopy = {
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
    
      refreshUserColor: "",
      popupColor: "",
      titleShadowColor: "",
      searchTitleShadowColor: "",
      footerSeperatorColor: "",
      loginShadowColor: "",
      inputColor: "",
      inputButtonColor: "",
    };
    this.selectedThemeCopy =  Object.assign(this.selectedThemeCopy, this.themes[this.selectedTheme]);
  }
  selectTheme( selectedTheme: number ) : void {
    this.selectedTheme = selectedTheme;
    this.setThemeForm();
    this.themeService.previewTheme(this.selectedThemeCopy);
  }
  confirmTheme() : void {
    this.themeService.currentTheme = this.selectedTheme;
    this.themeService.loadTheme();
    if (this.loginService.isLoggedin && this.loginService.currentUser !== undefined) {
      this.themeService.SetUserLastLoggedInTheme(this.loginService.currentUser, this.themeService.currentTheme).subscribe( (res: HttpResponse<UserReply>) => {
        /////////////////////////////////
      });
    } 
    this.selectTheme(this.selectedTheme);
  }
  updateTheme() : void {
    if (this.loginService.isLoggedin && this.loginService.currentUser !== undefined && this.loginService.isAdmin === true) {
      this.themeService.updateTheme(this.selectedThemeCopy).subscribe( (res: HttpResponse<Theme>) => {
        this.confirmTheme();
        this.themeService.GetThemesfromBackend();
      });
    } 
  }

}