import { style } from "@angular/animations";
import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ThemesService } from "../themes/themes.service";
import { LoginService } from "../toolbarAndLogin/login.service";
import { SearchService } from "../toolbarAndLogin/search.service";
import { UserReply, WebService } from "../web.service";
import { User } from "./user";
import { UserService } from "./users.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit{
  users: Array<User> = [];
  selectedUser: User | undefined;
  NewUserPopup: boolean = false;
  EditUserPopup: boolean = false;

  popupUserObject:any = { // popupUserObject cannot be given a type without breaking Angular bindings
    firstName: "",
    lastName: "",
    title: "",
    contactNum: 0,
    rated: false,
    quote: "",
    secret: "",
    symbol: "",
    symbolColor: "",
    cardColor: "",
    textColor: "",
    symbolBackgroundColor: "",
    password:"",
    sourceUser:undefined,
  }

  constructor (private userservice: UserService, private searchService: SearchService, private loginService: LoginService, private themeService: ThemesService){ 
  }

  public ngOnInit() : void {
    this.searchService.searchUserUpdate$.subscribe(
      (response:HttpResponse<UserReply>) => {this.users = <User[]> response.body?.users;
    });
    
    this.getUsers();

    let docUsers = document.querySelector(".users");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .users{ display:flex; flex-direction: column; align-items: center; }
      .card-container{ overflow-y:scroll; width: 100vw; display:flex; flex-wrap: wrap; flex-direction: row; justify-content:center; }
      .card{ margin: 20px 20px 20px 20px; height: 250px; width: 200px; display:flex; border-radius: 4px; background-color: cyan; box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray;}
      .card:hover { transform: translateY(-1rem) translatex(-.5rem); box-shadow: 0px 3px 15px gold, 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray; }
      
      .inner-card{ height: 230px; width: 180px; display:flex; flex:1; flex-direction: column; align-items: center; }
      .card-top{ width:100%; display:flex; flex-direction: row; align-items: center; justify-content: center; }
      .user-symbol-container{ display:flex; flex:1; align-items: center; justify-content: center; }
      .user-symbol{ height: 50px; width: 50px; border-radius: 50px; background-color: magenta; display:flex; align-items: center; justify-content: center; }
      .user-bio{ display:flex; flex:1; flex-direction: column; justify-content: center; }
      .user-about{display:flex; flex:1; flex-direction: column; }
      
      .new-user-button-container{ height: 230px; width: 180px; position: fixed; bottom:20px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .new-user-button{ position: absolute; height: 200px; width: 200px; clip-path: circle(60px); }
      .new-user-button-text-container{ position: absolute; height: 70px; width: 70px; display:flex; align-items: center; justify-content: center; }
      .new-user-button-text{ text-align: center; font-weight: bold; }
      .new-user-button:active { clip-path: circle(80px); }
      .new-user-button-text:active{ transform: translateY(-.2em);  }

      .refresh-users-button-container{ height: 230px; width: 180px; position: fixed; bottom:200px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .refresh-users-button{ position: absolute; height: 150px; width: 150px; clip-path: circle(50px); }
      .refresh-users-button-text-container{ position: absolute; height: 55px; width: 55px; display:flex; align-items: center; justify-content: center; }
      .refresh-users-button-text{ text-align: center; font-weight: bold; }
      .refresh-users-button:active { clip-path: circle(70px); }
      .refresh-users-button-text:active{ transform: translateY(-.2em);  }

      .seperator{ height: 10px; width:100%; }
      .user-footer{ display:flex; align-items: center; justify-content: center; margin: 0px 0px 50px 0px; }

      
      .edit-user-form{ top: 50px; left: 50px; display:none; border: 2px solid black; position:fixed; z-index:1; }
      .edit-user-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      .user-form-buttons{ margin: 10px 10px 10px 10px; display:flex; flex-direction: row; align-items: center; justify-content: center; }
    
      .new-user-form{ bottom: 50px; right: 50px; display:none; border: 2px solid black; position:fixed; z-index:1; }
      .new-user-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      
      .user-form-visible{ display:flex; }

      .disable-button{ visibility:hidden; }
      
    `;
    docUsers?.appendChild(newStyle);
  }
  public getUsers() : void {
    this.userservice.getUsers().subscribe( (usersResponse:HttpResponse<UserReply>) => {
      this.users = <User[]> usersResponse.body?.allUsers; 
    });
  }
  public updateUsers(popupUser: any) : void {
    let tempUser: User = {
      id:-1,
      firstName: "",
      lastName: "",
      title: "",
      contacts: [],
      contactNum: -1,
      quote: "",
      secret: "",
      lastTheme: -1,
      symbol: "",
      symbolColor: "",
      cardColor: "",
      textColor: "",
  
      symbolBackgroundColor:"",
    };
    for (let key in tempUser){
      (<any>tempUser)[key] = popupUser[key];
    }
    if(popupUser.rated && this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id!==popupUser.sourceUser.id && popupUser.sourceUser.contacts.indexOf(this.loginService.currentUser.id)===-1 ) { 
      this.addContact(tempUser, this.loginService.currentUser); 
    }
    if (this.loginService.isLoggedin && this.loginService.currentUser && (this.loginService.currentUser.id===popupUser.sourceUser.id || this.loginService.isAdmin) ) {
      this.userservice.updateUsers(tempUser).subscribe( (res: HttpResponse<UserReply>) => { 
        if (res.body?.success !== false) {
          if (res.body?.users) { this.loginService.pushToResponseBoxSuccess(`Updated User: ${res.body.users[0].id}`); }
        }
        this.getUsers();
      });
    }
    this.cancelUserPopup();
  }
  public deleteUser(userID:number) : void {
    this.userservice.deleteUser(userID).subscribe( (res: HttpResponse<UserReply>) => { 
      if (res.body?.success !== false) {
        this.loginService.pushToResponseBoxSuccess(`Deleted User: ${res.body?.message}`);
      }
      if (this.loginService.currentUser && Number(res.body?.message) === this.loginService.currentUser.id ) {
        this.loginService.cancelLogin();
      }
      this.getUsers();
    });
    this.cancelUserPopup();
  }
  public addUser(popupUser: any) : void {
    let newUser = {
      // id: number;
      firstName: popupUser.firstName,
      lastName: popupUser.lastName,
      title: popupUser.title,
      contacts: [],
      contactNum: 0,
      quote: popupUser.quote,
      secret: popupUser.secret,
      lastTheme: this.themeService.currentTheme,
      symbol: popupUser.symbol,
      symbolColor: popupUser.symbolColor,
      cardColor: popupUser.cardColor,
      textColor: popupUser.textColor,

      symbolBackgroundColor:popupUser.symbolBackgroundColor,
    }
    let tempPassword = popupUser.password; 
    // Since primaryUser lacks an id, it is not yet a user and must be passed in as an "any"
    this.userservice.addUser({ message: tempPassword, primaryUser: newUser }).subscribe( (res: HttpResponse<UserReply>) => { 
      if (res.body?.success !== false) {
        if (res.body?.users) { this.loginService.pushToResponseBoxSuccess(`Added User: ${res.body.users[0].id}`); }
      }
      this.getUsers();
    });
    this.cancelUserPopup();
  }
  public addContact(userAddTo: User, userToAdd: User) : void {
    this.userservice.addContact(userAddTo, userToAdd).subscribe( (res: HttpResponse<UserReply>) => { this.getUsers();});
  }
  public toggleNewUserPopup() : void {
    this.resetPopupUser();
    this.EditUserPopup = false;
    this.NewUserPopup = true;
  }
  public toggleEditUserPopup(user:User) : void {
    this.resetPopupUser();
    this.popupUserObject = Object.assign(this.popupUserObject, user);
    this.popupUserObject.sourceUser = user;

    let docUsersFormContacts = document.querySelector("#user-form-contacts");
    docUsersFormContacts?.setAttribute("disabled", "");

    let docUsersFormLastName = document.querySelector("#user-form-last-name");
    
    if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.isAdmin) {
    docUsersFormLastName?.removeAttribute("disabled");
    } else {
      docUsersFormLastName?.setAttribute("disabled", "");
    }

    let docUsersFormRate = document.querySelector("#user-form-rate");
    if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id !== user.id && this.loginService.currentUser && user.contacts.indexOf(this.loginService.currentUser.id)===-1) {
      docUsersFormRate?.removeAttribute("disabled");
    } else {
      docUsersFormRate?.setAttribute("disabled", "");
    }

    let docUsersFormFirstName = document.querySelector("#user-form-first-name");
    let docUsersFormTitle = document.querySelector("#user-form-title");
    let docUsersFormQuote = document.querySelector("#user-form-quote");
    let docUsersFormSymbol = document.querySelector("#user-form-symbol");
    let docUsersFormSymbolColor = document.querySelector("#user-form-symbol-color");
    let docUsersFormCardColor = document.querySelector("#user-form-card-color");
    let docUsersFormTextColor = document.querySelector("#user-form-text-color");
    let docUsersFormBackgroundColor = document.querySelector("#user-form-symbol-background-color");
    let docUsersFormDelete = document.querySelector("#user-form-delete");
    if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id === user.id || this.loginService.isAdmin) {
      docUsersFormFirstName?.removeAttribute("disabled");
      docUsersFormTitle?.removeAttribute("disabled");
      docUsersFormQuote?.removeAttribute("disabled");
      docUsersFormSymbol?.removeAttribute("disabled");
      docUsersFormSymbolColor?.removeAttribute("disabled");
      docUsersFormCardColor?.removeAttribute("disabled");
      docUsersFormTextColor?.removeAttribute("disabled");
      docUsersFormBackgroundColor?.removeAttribute("disabled");
      docUsersFormDelete?.removeAttribute("disabled");
      docUsersFormDelete?.setAttribute("class", "");
    } else {
      docUsersFormFirstName?.setAttribute("disabled", "");
      docUsersFormTitle?.setAttribute("disabled", "");
      docUsersFormQuote?.setAttribute("disabled", "");
      docUsersFormSymbol?.setAttribute("disabled", "");
      docUsersFormSymbolColor?.setAttribute("disabled", "");
      docUsersFormCardColor?.setAttribute("disabled", "");
      docUsersFormTextColor?.setAttribute("disabled", "");
      docUsersFormBackgroundColor?.setAttribute("disabled", "");
      docUsersFormDelete?.setAttribute("disabled", "");
      docUsersFormDelete?.setAttribute("class", "disable-button");
    }
    let docUsersFormSecret = document.querySelector("#user-form-secret");
    if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id === user.id) {
      docUsersFormSecret?.removeAttribute("disabled");
    } else {
      docUsersFormSecret?.setAttribute("disabled", "");
    }
    this.NewUserPopup = false;
    this.EditUserPopup = true;
  }
  public cancelUserPopup() : void {
    this.resetPopupUser();
    this.NewUserPopup = false;
    this.EditUserPopup = false;
  }
  public resetPopupUser() : void {
    this.popupUserObject = {
      firstName: "",
      lastName: "",
      title: "",
      contactNum: 0,
      rated: false,
      quote: "",
      secret: "",
      symbol: "",
      symbolColor: "",
      cardColor: "",
      textColor: "",
      symbolBackgroundColor: "",
      password:"",
      sourceUser:undefined,
    }
  }

}
