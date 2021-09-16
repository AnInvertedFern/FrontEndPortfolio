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

  constructor (private route: ActivatedRoute, private searchService: SearchService, private loginService: LoginService) {
    
  }
  public ngOnInit() {
    let docUsers = document.querySelector("toolbar"); //background-color: blue;
    let newStyle = document.createElement("style");
    newStyle.textContent = "\
      .toolbar{ height: 50px; border-radius: 4px; display:flex; align-items: center; background-color: red; }\
      .tabs{ display:flex; align-items: center; }\
      .tab-container{ height: 30px; width: 70px; flex:1; margin: auto 5px auto 30px;  border-radius: 4px; display:flex; align-items: center; justify-content: center; }\
      .active{ background-color: yellow; }\
      .search-container{ height: 30px; background-color: white; border-radius: 1px; margin: auto 30px auto 30px; display:flex; align-items: center; flex:1; flex-direction: row-reverse; }\
      .search-container2{ height: 20px; background-color: grey; border-radius: 3px; margin: auto 10px auto 10px; display:flex; align-items: center; }\
      .login-container{ height: 30px; border-radius: 4px; display:flex; justify-items: center; align-items: center; flex:1; flex-direction: row-reverse; }\
      .login-container2{ height: 30px; width: 120px; border-radius: 4px; margin: auto 30px auto 30px; background-color: purple; margin: auto 30px auto 30px; display:flex; align-items: center; justify-content: center; }\
    ";
    docUsers?.appendChild(newStyle);
    
  }
  public getCurrentTab() {
    return this.route.snapshot.url.join('');
  }
  public search( value: string, options: Object ) {
    if (this.getCurrentTab() === "Users") {
      this.searchService.usersSearch(value, options);
    } if (this.getCurrentTab() === "Titles") {
      this.searchService.titlesSearch(value, options);
    }
  }
  
  public loginPopupEvent() {
    this.loginPopup = !this.loginPopup;
  }
  public searchPopupEvent() {
    this.searchPopup = !this.searchPopup;
  }
  public login( loginData: Object | FormData ) {
    this.loginService.login(loginData);
  }

}
