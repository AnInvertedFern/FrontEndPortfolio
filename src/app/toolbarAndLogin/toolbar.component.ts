import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "./login.service";
import { SearchService } from "./search.service";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  searchPopup: boolean = false;
  loginPopup: boolean = false;
  searchEntry: string = "";
  popupLoginObject:any={
    userID:"",
    password:"",
  }

  constructor (private route: ActivatedRoute, private searchService: SearchService, private loginService: LoginService) {
    
  }
  public ngOnInit() {
    let docToolbar = document.querySelector(".toolbar"); //background-color: blue;
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .toolbar{ height: 50px; border-radius: 4px; display:flex; align-items: center; }
      .tabs{ display:flex; align-items: center; }
      .tab-container{ height: 30px; width: 70px; flex:1; margin: auto 5px auto 30px;  border-radius: 4px; display:flex; align-items: center; justify-content: center; }
      .active{  }
      .search-container{ height: 30px; border-radius: 1px; margin: auto 30px auto 30px; display:flex; align-items: center; flex:1; flex-direction: row-reverse; }
      .search-container2{ height: 100%; width:100%; display:flex; flex-direction: row; }
      #search-input{ box-sizing: border-box; height: 100%; width:100%; flex: 1; }
      .search-container3{ height: 30px; height: 20px; background-color: grey; border-radius: 3px; margin: auto 10px auto 10px; display:flex; flex-direction: row; align-items: center; }
      #search-enter{ box-sizing: border-box; height: 30px; }
      .login-container{ height: 30px; border-radius: 4px; display:flex; justify-items: center; align-items: center; flex:1; flex-direction: row-reverse; }
      .login-container2{ height: 30px; width: 120px; border-radius: 4px; margin: auto 30px auto 30px; margin: auto 30px auto 30px; display:flex; align-items: center; justify-content: center; }
      .login-form{ border: 2px solid black; background-color: white; position:fixed; top: 50px; right: 50px; display:none; }
      .login-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      .login-form-visible{ display:flex; }
    `;
    docToolbar?.appendChild(newStyle);
    
  }
  public getCurrentTab() {
    return this.route.snapshot.children[0].url[0].path;
  }
  public search(  ) {
    console.log(this.route.snapshot.children[0].url[0].path);
    if (this.getCurrentTab() === "users-component") {
      this.searchService.usersSearch("value", {});
    } if (this.getCurrentTab() === "titles-component") {
      this.searchService.titlesSearch("value", {});
    }
  }
  
  public loginPopupEvent() {
    this.resetPopupLogin();
    this.loginPopup = !this.loginPopup;
  }
  public loginPopupCancel() {
    this.resetPopupLogin();
    this.loginPopup = false;
  }
  public resetPopupLogin(){
    this.popupLoginObject={
      userID:"",
      password:"",
    }
  }
  public searchPopupEvent() {
    this.searchPopup = !this.searchPopup;
  }
  public login(  ) {
    this.resetPopupLogin();
    this.loginPopupCancel();
    this.loginService.login(this.popupLoginObject);
  }

}
