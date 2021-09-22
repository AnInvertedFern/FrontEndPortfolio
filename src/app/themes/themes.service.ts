import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoginService } from "../toolbarAndLogin/login.service";
import { User } from "../users/user";
import { WebService } from "../web.service";
import { Theme } from "./theme";

@Injectable({providedIn:'root'})
export class ThemesService {
  
  selectedTheme: number = 0;
  currentTheme: number = 0;

  
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
  }
  themes: Theme[] = [this.dummyTheme];

  
  constructor( private webService: WebService, private loginService: LoginService) { 
    console.log("in themes service constructor");
    loginService.loginThemeUpdate$.subscribe(
      (lastTheme: number) => {
        console.log(lastTheme);
        this.currentTheme = lastTheme; this.selectedTheme = lastTheme;
        this.loadTheme();
    });

    // this.GetThemesfromBackend();

    // this.themes.push(
    //   {
    //     index: -1,
    //     inactiveTabColor: "blue",
    //     activeTabColor: "yellow",
    //     toolbarColor: "red",
    //     searchBarColor: "navy",
    //     logoutButtonColor: "purple",
    //     backgroundColor: "grey",
    //     textColor: "brown",
    //     addUserColor: "gold",
    //     editUserColor: "green",
    //     confirmThemeColor: "red",
    //     userCardOutlineColor: "green",
    //   }
    // );
    // this.themes.push(
    //   {
    //     index: -1,
    //     inactiveTabColor: "yellow",
    //     activeTabColor: "blue",
    //     toolbarColor: "navy",
    //     searchBarColor: "red",
    //     logoutButtonColor: "black",
    //     backgroundColor: "purple",
    //     textColor: "lime",
    //     addUserColor: "brown",
    //     editUserColor: "green",
    //     confirmThemeColor: "red",
    //     userCardOutlineColor: "green",
    //   }
    // );
    // this.themes.push(
    //   {
    //     index: -1,
    //     inactiveTabColor: "blue",
    //     activeTabColor: "yellow",
    //     toolbarColor: "red",
    //     searchBarColor: "navy",
    //     logoutButtonColor: "purple",
    //     backgroundColor: "black",
    //     textColor: "white",
    //     addUserColor: "brown",
    //     editUserColor: "green",
    //     confirmThemeColor: "red",
    //     userCardOutlineColor: "green",
    //   }
    // );

    // this.themesChanged();

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

  
  public loadTheme(){

    let docGeneral = document.querySelector(".general-styles");
    console.log(docGeneral);
    console.log(document.getElementsByClassName("general-styles"));
    console.log(document.querySelector("general-styles"));
    let newStyle2 = document.createElement("style");   //${this.themes[0].searchBarColor}; }
    newStyle2.textContent = `
      *{ color: ${this.themes[this.currentTheme].textColor}; overflow:hidden; }
      body{ margin: 0px 0px 0px 0px; }
      .background-colorer{ background-color: ${this.themes[this.currentTheme].backgroundColor}; position: absolute; width:100vw; height:100vh; }
      .popup{ background-color: ${this.themes[this.currentTheme].backgroundColor}; }
      .tab-container{ background-color: ${this.themes[this.currentTheme].inactiveTabColor}; }
      .active{ background-color: ${this.themes[this.currentTheme].activeTabColor}; }
      .toolbar{ background-color: ${this.themes[this.currentTheme].toolbarColor}; }
      .search-container{ background-color: white}
      #search-input{ background-color: ${this.themes[this.currentTheme].searchBarColor}; }
      .login-container2{ background-color: ${this.themes[this.currentTheme].logoutButtonColor}; }
      .logout-container2{ background-color: ${this.themes[this.currentTheme].logoutButtonColor}; }
      .new-user-button{ background-color: ${this.themes[this.currentTheme].addUserColor}; }
      .theme-confirm-button{ background-color: ${this.themes[this.currentTheme].confirmThemeColor}; }
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