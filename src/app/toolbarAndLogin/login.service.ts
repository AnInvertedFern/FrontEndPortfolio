import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Theme } from "../themes/theme";
import { User } from "../users/user";
import { getRoleReply, WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class LoginService {

  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  currentUser: User | undefined;
  unCheckedCredentials: Credentials | undefined;
  checkedCredentials: Credentials | undefined;
  constructor(private webService: WebService, private router: Router,private route: ActivatedRoute) { 
  }
  public login(credentials: Credentials) : void {
    this.unCheckedCredentials = credentials;
    this.webService.attemptLogin_GetRole(credentials).subscribe( (res:HttpResponse<getRoleReply>) => {
      this.loginHelper1(res);
      this.loginHelper2();
    });
  }
  public logout() : void {
    this.webService.attemptLogout(<Credentials> this.checkedCredentials).subscribe( (res:HttpResponse<string>) => {
      this.unCheckedCredentials = undefined;
      this.checkedCredentials = undefined;
      this.isAdmin = false;
      this.isLoggedin = false;
      this.currentUser = undefined;
      let tempPath = (<any> this.route)._routerState.snapshot.url;
      this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));
    });
  }
  public cancelLogin() : void {
    this.unCheckedCredentials = undefined;
    this.checkedCredentials = undefined;
    this.isAdmin = false;
    this.isLoggedin = false;
    this.currentUser = undefined;

    let tempPath = (<any> this.route)._routerState.snapshot.url;
    this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));

  }
  public loginHelper1(res:HttpResponse<getRoleReply>) : void {
    if (this.unCheckedCredentials !== undefined){
      if (res.body?.success === true) {
        this.checkedCredentials = this.unCheckedCredentials;
        this.isLoggedin = true;
        this.isAdmin = <boolean> res.body.admin;
        this.currentUser = res.body.currentUser;
      }
    }
    this.unCheckedCredentials = undefined;
  }
  public loginHelper2() : void {
    if (this.currentUser !== undefined){
      this.loginThemeUpdateSource.next( this.currentUser.lastTheme );
      let tempPath = (<any> this.route)._routerState.snapshot.url;
      this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));
    }
  }
  
  private loginThemeUpdateSource = new Subject<number>();
  loginThemeUpdate$ = this.loginThemeUpdateSource.asObservable();
  
  public pushToResponseBoxSuccess(response:string) : void {
    this.responseBoxSuccessUpdateSource.next( response );
  }
  public pushToResponseBoxFailure(response:string) : void {
    this.responseBoxFailureUpdateSource.next( response );
  }
  private responseBoxSuccessUpdateSource = new Subject<string>();
  responseBoxSuccessUpdate$ = this.responseBoxSuccessUpdateSource.asObservable();
  private responseBoxFailureUpdateSource = new Subject<string>();
  responseBoxFailureUpdate$ = this.responseBoxFailureUpdateSource.asObservable();
}

export class Credentials {
  userID:string = "";
  password:string = "";
}