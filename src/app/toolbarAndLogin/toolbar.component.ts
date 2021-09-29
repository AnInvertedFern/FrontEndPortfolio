import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Credentials, LoginService } from "./login.service";
import { SearchService } from "./search.service";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loginPopup: boolean = false;
  searchEntry: string = "";
  popupLoginObject:Credentials={
    userID:"",
    password:"",
  }

  responseBoxSuccess: string = "";
  responseBoxFailure: string = "";
  responseBoxSuccessPopup: boolean = false;
  responseBoxFailurePopup: boolean = false;
  
  constructor (private route: ActivatedRoute, private searchService: SearchService, public loginService: LoginService) {
  }
  public ngOnInit() : void {
    this.loginService.responseBoxSuccessUpdate$.subscribe(
      toPublish => {
        this.responseBoxSuccess = toPublish;
        this.responseBoxSuccessPopup = true;
    });
    this.loginService.responseBoxFailureUpdate$.subscribe(
      toPublish => {
        this.responseBoxFailure = toPublish;
        this.responseBoxFailurePopup = true;
    });

    let docToolbar = document.querySelector(".toolbar");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .toolbar{ height: 50px; border-radius: 4px; display:flex; align-items: center; }
      .tabs{ display:flex; align-items: center; font-weight: bold; }
      .tab-container{ height: 30px; width: 70px; flex:1; margin: auto 5px auto 30px;  border-radius: 4px; display:flex; align-items: center; justify-content: center; }
      .active{  }
      .search-container{ height: 30px; border-radius: 1px; margin: auto 30px auto 30px; display:flex; align-items: center; flex:1; flex-direction: row-reverse; }
      .search-container2{ height: 100%; width:100%; display:flex; flex-direction: row; }
      #search-input{ box-sizing: border-box; height: 100%; width:100%; flex: 1; font-weight: bold; }
      .search-container3{ height: 30px; height: 20px; background-color: grey; border-radius: 3px; margin: auto 10px auto 10px; display:flex; flex-direction: row; align-items: center; }
      #search-enter{ box-sizing: border-box; height: 30px; font-weight: bold; }
      
      .login-container, .logout-container { height: 100%; width:100%; border-radius: 4px; display:none; justify-items: center; align-items: center; flex:1; flex-direction: row-reverse; }
      .login-container2, .logout-container2 { height: 30px; width: 120px; border-radius: 4px; margin: auto 30px auto 30px; margin: auto 30px auto 30px; display:flex; align-items: center; justify-content: center; }

      .login-button-visible, .logout-button-visible { display:flex; }
      .login, .logout { display:flex; align-items: center; justify-content: center; height: 100%; width:100%; font-weight: bold; }
      .login:hover, .logout:hover { transform: translateY(-.1em) translatex(-.5em); }

      .login-form{ border: 2px solid black; position:fixed; top: 50px; right: 50px; display:none; z-index:1; }
      .login-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      .login-form-visible{ display:flex; }

      
      .response-box-success{ height:15%; width:35%; overflow:auto; border: 2px solid darkgreen; position:fixed; top: 100px; left: 70px; display:none; z-index:1; }
      .response-box-success-subcontainer{ height:100%; width:100%; background-color:green; color:darkgreen; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      .response-box-failure{ height:15%; width:35%; overflow:auto; border: 2px solid darkred; position:fixed; top: 200px; left: 70px; display:none; z-index:1; }
      .response-box-failure-subcontainer{ height:100%; width:100%; background-color:red; color:darkred; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }

      .response-box-close{ position:absolute; bottom:2px; right:2px; color:midnightblue;}

      .response-box-success-visible, .response-box-failure-visible { display:flex; }

    `;
    docToolbar?.appendChild(newStyle);
    
  }
  public getCurrentTab() : string {
    return (<any> this.route)._routerState.snapshot.url;
  }
  public search() : void {
    if (this.getCurrentTab() === "/users-component") {
      this.searchService.usersSearch(this.searchEntry);
    } if (this.getCurrentTab() === "/titles-component") {
      this.searchService.titlesSearch(this.searchEntry);
    }
    this.searchEntry = "";
  }
  
  public loginPopupEvent() : void {
    this.resetPopupLogin();
    this.loginPopup = !this.loginPopup;
  }
  public loginPopupCancel() : void {
    this.resetPopupLogin();
    this.loginPopup = false;
  }
  public resetPopupLogin() : void {
    this.popupLoginObject={
      userID:"",
      password:"",
    }
  }
  public logout() : void {
    this.loginService.logout();
  }
  public responseBoxCancel() : void {
    this.responseBoxSuccessPopup = false;
    this.responseBoxSuccessPopup = false;
  }
  public login() : void {
    this.loginService.login(this.popupLoginObject);
    this.resetPopupLogin();
    this.loginPopupCancel();
  }

}
