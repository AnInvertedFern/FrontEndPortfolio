import { style } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ThemesService } from "../themes/themes.service";
import { LoginService } from "../toolbarAndLogin/login.service";
import { SearchService } from "../toolbarAndLogin/search.service";
import { WebService } from "../web.service";
import { User } from "./user";
import { UserService } from "./users.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers: [UserService]
})
export class UserComponent implements OnInit{
  users: Array<User> = [];
  selectedUser: User | undefined;
  NewUserPopup: boolean = false;
  EditUserPopup: boolean = false;
  currentUser: User | undefined;

  popupUserObject:any = {
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
    console.log("in user component constructor");
  }

  public ngOnInit() {
    this.loginService.currentUserUpdate$.subscribe(
      newCurrentUser => {this.currentUser = newCurrentUser;
    });
    this.searchService.searchUserUpdate$.subscribe(
      (response:any) => {this.users = response.body.users;
    });
    
    this.getUsers();

    let docUsers = document.querySelector(".users");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .users{ display:flex; flex-direction: column; align-items: center; }
      .card-container{ width: 100vw; overflow:auto; display:flex; flex-wrap: wrap; flex-direction: row; justify-content:center; }
      .card{ margin: 20px 20px 20px 20px; height: 250px; width: 200px; display:flex; border-radius: 4px; background-color: cyan; box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray;}
      .card:hover { transform: translateY(-1rem) translatex(-.5rem); box-shadow: 0px 3px 15px gold, 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray; }
      
      .inner-card{ height: 230px; width: 180px; display:flex; flex:1; flex-direction: column; align-items: center; }
      .card-top{ width:100%; display:flex; flex-direction: row; align-items: center; justify-content: center; }
      .user-symbol-container{ display:flex; flex:1; align-items: center; justify-content: center; }
      .user-symbol{ height: 50px; width: 50px; border-radius: 50px; background-color: magenta; display:flex; align-items: center; justify-content: center; }
      .user-bio{ display:flex; flex:1; flex-direction: column; align-items: center; justify-content: center; }
      .user-about{display:flex; flex:1; flex-direction: column; }
      
      .new-user-button-container{ height: 230px; width: 180px; position: fixed; bottom:20px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .new-user-button{ position: absolute; height: 200px; width: 200px; clip-path: circle(60px); }
      .new-user-button-text-container{ position: absolute; height: 70px; width: 70px; display:flex; align-items: center; justify-content: center; }
      .new-user-button-text{ text-align: center; }
      .new-user-button:hover { clip-path: circle(80px); }
      .new-user-button-text:hover{ transform: translateY(-.2em);  }

      .refresh-users-button-container{ height: 230px; width: 180px; position: fixed; bottom:200px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .refresh-users-button{ position: absolute; height: 150px; width: 150px; background-color:green; clip-path: circle(50px); }
      .refresh-users-button-text-container{ position: absolute; height: 50px; width: 50px; display:flex; align-items: center; justify-content: center; }
      .refresh-users-button-text{ text-align: center; }
      .refresh-users-button:hover { clip-path: circle(70px); }
      .refresh-users-button-text:hover{ transform: translateY(-.2em);  }

      .seperator{ height: 10px; width:100%; background-color: orange; }
      .user-footer{ display:flex; align-items: center; justify-content: center; }

      
      .edit-user-form{ top: 50px; left: 50px; display:none; border: 2px solid black; position:fixed; }
      .edit-user-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      .user-form-buttons{ margin: 10px 10px 10px 10px; display:flex; flex-direction: row; align-items: center; justify-content: center; }
    
      .new-user-form{ bottom: 50px; right: 50px; display:none; border: 2px solid black; position:fixed; }
      .new-user-form-subcontainer{ margin: 10px 10px 10px 10px; display:flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; }
      
      .user-form-visible{ display:flex; }

      .disable-button{ visibility:hidden; }
      
    `;
    docUsers?.appendChild(newStyle);
    
  }
  // public getCurrentUser(){
  //   return this.currentUser;
  //   //get it from login service
  // }

  public getUsers() {//(usersResponse:Array<User>)
    this.userservice.getUsers().subscribe( (usersResponse:any) => {
      this.users = usersResponse.body.allUsers; 
      console.log(this.users);
      console.log(usersResponse);
    });
    console.log("Getting Users");
  }

  public updateUsers(popupUser: any){
    console.log("Updating User");
    
    let tempUser: any = {
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
    // let tempUser: any = popupUser.sourceUser;
    // tempUser = Object.assign(tempUser, user);
    for (let key in tempUser){
      tempUser[key] = popupUser[key];
    }
    console.log(popupUser.sourceUser);
    console.log(tempUser);
    if(popupUser.rated && this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id!==popupUser.sourceUser.id && popupUser.sourceUser.contacts.indexOf(this.loginService.currentUser.id)===-1 ) { 
      console.log( !(this.loginService.currentUser.id in popupUser.sourceUser.contacts) );
      this.addContact(tempUser, this.loginService.currentUser); 
    }
    this.userservice.updateUsers(tempUser).subscribe( (res: any) => { 
      console.log(res); 
      this.loginService.pushToResponseBoxSuccess(`Updated User: ${res.body.users[0].id}`); 
      this.getUsers();
    });
    this.cancelUserPopup();
  }
  public deleteUser(userID:number){
    console.log(userID);
    this.userservice.deleteUser(userID).subscribe( (res: any) => { 
      console.log(res); 
      this.loginService.pushToResponseBoxSuccess(`Deleted User: ${res.body.message}`);
      this.getUsers();
      this.loginService.cancelLogin();
    });
    this.cancelUserPopup();
  }
  
  //needs to somehow return the user id
  public addUser(popupUser: any){
    console.log("Adding User");
    console.log(popupUser);
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
    this.userservice.addUser({ message: tempPassword, primaryUser: newUser }).subscribe( (res: any) => { 
      console.log(res); 
      this.loginService.pushToResponseBoxSuccess(`Added User: ${res.body.users[0].id}`);
      this.getUsers();
    });
    this.cancelUserPopup();
  }
  public addContact(userAddTo: User, userToAdd: User){
    console.log("Adding Contact");
    this.userservice.addContact(userAddTo, userToAdd).subscribe( (res: any) => { console.log(res); this.getUsers();});
  }

  public selectUser(user:User) {
    this.selectedUser = user;
  }
  public toggleNewUserPopup(){
    console.log("Opening new User Popup");
    this.resetPopupUser();
    this.EditUserPopup = false;
    this.NewUserPopup = true;
  }
  public toggleEditUserPopup(user:User){
    console.log("Opening edit User Popup");
    this.resetPopupUser();
    this.popupUserObject = Object.assign(this.popupUserObject, user);
    this.popupUserObject.sourceUser = user;

    let docUsersFormContacts = document.querySelector("#user-form-contacts");
    docUsersFormContacts?.setAttribute("disabled", "");
    let docUsersFormLastName = document.querySelector("#user-form-last-name");
    docUsersFormLastName?.setAttribute("disabled", "");

    let docUsersFormRate = document.querySelector("#user-form-rate");
    if (this.loginService.currentUser) {
      console.log(user.contacts.indexOf(this.loginService.currentUser.id)!==-1);
      console.log(this.loginService.currentUser.id);
      console.log(user.contacts);
      console.log(this.loginService.currentUser.id === user.contacts[0]);
    }
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
  public cancelUserPopup(){
    console.log("Closing User Popup");
    this.resetPopupUser();
    this.NewUserPopup = false;
    this.EditUserPopup = false;
  }
  public resetPopupUser(){
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
