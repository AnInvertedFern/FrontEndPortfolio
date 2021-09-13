import { Injectable } from "@angular/core"
import { User } from "../users/user";
import { WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class LoginService {
  userID: string;
  password: string;
  isAdmin: boolean;
  isLoggedin: boolean;
  currentUser: User;
  constructor(private webService: WebService) { 
  }
  public IsAdmin() {
    return this.isAdmin;
  }
  public getCurrentUser() {
    return this.currentUser;
  }
  public setCredentials(username: string, password: string){
    this.password = password;
    this.userID = userID;
  }
  public login(credentials: any) {
    this.webService.attemptLogin_GetRole(credentials);
    setCredentials( credentials.userID, credentials.password);
    this.currentUser = this.webService.getUserByID(this.userID);
    this.currentUserUpdateSource.next( this.currentUser );
    this.loginThemeUpdateSource.next( this.currentUser.lastTheme );
  }

  
  private loginThemeUpdateSource = new Subject<string>();
  loginThemeUpdate$ = this.loginThemeUpdateSource.asObservable();

  private currentUserUpdateSource = new Subject<string>();
  currentUserUpdate$ = this.currentUserUpdateSource.asObservable();
}