import { Injectable } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Theme } from "../themes/theme";
import { User } from "../users/user";
import { WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class LoginService {


  // userID: number | undefined;
  // password: string | undefined;
  isAdmin: boolean = false;
  isLoggedin: boolean = false;
  currentUser: User | undefined;
  unCheckedCredentials: any | undefined;
  checkedCredentials: any | undefined;
  constructor(private webService: WebService, private router: Router,private route: ActivatedRoute) { 
  }
  // public IsAdmin() {
  //   return this.isAdmin;
  // }
  // public getCurrentUser() {
  //   return this.currentUser;
  // }
  // public setCredentials(userID: number, password: string){
  //   this.password = password;
  //   this.userID = userID;
  // }
  public login(credentials: any) {
    this.unCheckedCredentials = credentials;
    this.webService.attemptLogin_GetRole(credentials).subscribe( (res:any) => {
      console.log(res);
      this.loginHelper1(res);
      this.loginHelper2();
    });
  }
  public logout() {
    console.log("in logout");
    this.webService.attemptLogout(this.checkedCredentials).subscribe( (res:any) => {
      console.log("in attemptlogout response");
      console.log(res);
      this.unCheckedCredentials = undefined;
      this.checkedCredentials = undefined;
      this.isAdmin = false;
      this.isLoggedin = false;
      this.currentUser = undefined;
      console.log(this);
      // let tempPath = this.route.snapshot.children[0].url[0].path;
      let tempPath = (<any> this.route)._routerState.snapshot.url;
      this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));
    });
  }
  public cancelLogin(){
    this.unCheckedCredentials = undefined;
    this.checkedCredentials = undefined;
    this.isAdmin = false;
    this.isLoggedin = false;
    this.currentUser = undefined;
    console.log(this);

    console.log((<any> this.route)._routerState.snapshot.url);
    let tempPath = (<any> this.route)._routerState.snapshot.url;
    // let tempPath = this.route.snapshot.children[0].url[0].path;
    this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));

  }
  public loginHelper1(res:any){
    // this.setCredentials( credentials.userID, credentials.password);
    if (this.unCheckedCredentials !== undefined){
      if (res.body.success === true) {
        this.checkedCredentials = this.unCheckedCredentials;
        this.isLoggedin = true;
        this.isAdmin = res.body.admin;
        console.log(res.body.admin);
        this.currentUser = res.body.currentUser;
      }
    }
    this.unCheckedCredentials = undefined;
  }
  public loginHelper2(){
    // this.currentUser = res.currentUser;
    if (this.currentUser !== undefined){
      this.currentUserUpdateSource.next( this.currentUser );
      this.loginThemeUpdateSource.next( this.currentUser.lastTheme );
      console.log(this.route);
      // console.log(this.route.snapshot.children[0].url[0].path);
      // let tempPath = this.route.snapshot.children[0].url[0].path;
      console.log((<any> this.route)._routerState.snapshot.url);
      let tempPath = (<any> this.route)._routerState.snapshot.url;
      this.router.navigateByUrl("/dummy-component", {skipLocationChange:true}).then(()=>this.router.navigate([tempPath]));
    }
  }


  
  private loginThemeUpdateSource = new Subject<number>();
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