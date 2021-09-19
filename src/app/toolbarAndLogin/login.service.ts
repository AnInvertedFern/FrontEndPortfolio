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
  checkedCredentials: any | undefined;
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
    this.webService.attemptLogin_GetRole(credentials).subscribe( (res:any) => {
      this.loginHelper1(res);
      this.loginHelper2();
    });
  }
  public loginHelper1(res:any){
    // this.setCredentials( credentials.userID, credentials.password);
    if (this.unCheckedCredentials !== undefined){
      if (res.loginSucess === true) {
        this.checkedCredentials = this.unCheckedCredentials;
        this.isLoggedin = true;
        this.isAdmin = res.isAdmin;
        this.currentUser = res.currentUser;
      }
    }
  }
  public loginHelper2(){
    // this.currentUser = res.currentUser;
    if (this.currentUser !== undefined){
      this.currentUserUpdateSource.next( this.currentUser );
      this.loginThemeUpdateSource.next( this.currentUser.lastTheme );
    }
  }


  
  private loginThemeUpdateSource = new Subject<Theme>();
  loginThemeUpdate$ = this.loginThemeUpdateSource.asObservable();

  //Might be unncessary, its ownly use would be if the user view needs to have a binding
  private currentUserUpdateSource = new Subject<User>();
  currentUserUpdate$ = this.currentUserUpdateSource.asObservable();


  
  public pushToResponseBoxSuccess(response:string){
    this.responseBoxSuccessUpdateSource.next( response );
  }
  public pushToResponseBoxFailure(response:string){
    this.responseBoxFailureUpdateSource.next( response );
  }
  private responseBoxSuccessUpdateSource = new Subject<string>();
  responseBoxSuccessUpdate$ = this.responseBoxSuccessUpdateSource.asObservable();
  private responseBoxFailureUpdateSource = new Subject<string>();
  responseBoxFailureUpdate$ = this.responseBoxFailureUpdateSource.asObservable();
}