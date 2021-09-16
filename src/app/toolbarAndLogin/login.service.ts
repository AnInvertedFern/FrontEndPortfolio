import { Injectable } from "@angular/core"
import { Subject } from "rxjs";
import { Theme } from "../themes/theme";
import { User } from "../users/user";
import { WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class LoginService {
  userID: number | undefined;
  password: string | undefined;
  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  currentUser: User | undefined;
  unCheckedCredentials: any | undefined;
  constructor(private webService: WebService) { 
  }
  public IsAdmin() {
    return this.isAdmin;
  }
  public getCurrentUser() {
    return this.currentUser;
  }
  // public setCredentials(userID: number, password: string){
  //   this.password = password;
  //   this.userID = userID;
  // }
  public login(credentials: any) {
    this.unCheckedCredentials = credentials;
    this.webService.attemptLogin_GetRole(credentials).subscribe(this.loginHelper1);
    this.webService.getUserByID(credentials.userID).subscribe(this.loginHelper2);
  }
  public loginHelper1(res:any){
    // this.setCredentials( credentials.userID, credentials.password);
    if (this.unCheckedCredentials !== undefined){
      if (this.unCheckedCredentials.userID === res.userID && this.unCheckedCredentials.password === res.password){
        this.userID = res.userID;
        this.password = res.password;
      }
    }
  }
  public loginHelper2(res:any){
    this.currentUser = res.currentUser;
    if (this.currentUser !== undefined){
      this.currentUserUpdateSource.next( this.currentUser );
      this.loginThemeUpdateSource.next( this.currentUser.lastTheme );
    }
  }


  
  private loginThemeUpdateSource = new Subject<Theme>();
  loginThemeUpdate$ = this.loginThemeUpdateSource.asObservable();

  private currentUserUpdateSource = new Subject<User>();
  currentUserUpdate$ = this.currentUserUpdateSource.asObservable();
}