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
  providers: [UserService]
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
    loginService.currentUserUpdate$.subscribe(
      newCurrentUser => {this.currentUser = newCurrentUser;
    });
    searchService.searchUserUpdate$.subscribe(
      (response:any) => {this.users = response.users;
    });
  }

  public ngOnInit() {
    this.getUsers();
    // this.users.push(
    //   {
    //     id: 1,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    // this.users.push(
    //   {
    //     id: 2,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    // this.users.push(
    //   {
    //     id: 3,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    // this.users.push(
    //   {
    //     id: 5,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    // this.users.push(
    //   {
    //     id: 6,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    // this.users.push(
    //   {
    //     id: 7,
    //     firstName: "Bob",
    //     lastName: "Smith",
    //     title: "Cook",
    //     contacts: [-1,-1,-1],
    //     contactNum: 3,
    //     quote: "Hi, I am Bob",
    //     secret: "This is a secret",
    //     lastTheme: undefined,
    //     symbol: "O",
    //     symbolColor: "Green",
    //     cardColor: "Black",
    //     textColor: "White",
    //     symbolBackgroundColor: "purple",
    //   }
    // );
    
    let docUsers = document.querySelector(".users");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .users{ display:flex; flex-direction: column; align-items: center; }
      .card-container{ overflow:auto; display:flex; flex-wrap: wrap; flex-direction: row; justify-content:center; }
      .card{ height: 250px; width: 200px; display:flex; border-radius: 4px; background-color: cyan; margin: 10px 8px 16px;  box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray;}
      .inner-card{ height: 230px; width: 180px; display:flex; flex:1; flex-direction: column; align-items: center; }
      .card-top{ width:100%; display:flex; flex-direction: row; align-items: center; justify-content: center; }
      .user-symbol-container{ display:flex; flex:1; align-items: center; justify-content: center; }
      .user-symbol{ height: 50px; width: 50px; border-radius: 50px; background-color: magenta; display:flex; align-items: center; justify-content: center; }
      .user-bio{ display:flex; flex:1; flex-direction: column; align-items: center; justify-content: center; }
      .user-about{display:flex; flex:1; flex-direction: column; }
      
      .new-user-button-container{ height: 230px; width: 180px; position: fixed; bottom:20px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .new-user-button{ position: absolute; height: 100px; width: 100px; clip-path: circle(50px); }
      .new-user-button-text-container{ position: absolute; height: 70px; width: 70px; display:flex; align-items: center; justify-content: center; }
      .new-user-button-text{ text-align: center; }

      .refresh-users-button-container{ height: 230px; width: 180px; position: fixed; bottom:200px; right: 20px; display:flex; align-items: center; justify-content: center; filter: drop-shadow(-5px -5px 10px black) drop-shadow(5px 5px 10px lightslategray); }
      .refresh-users-button{ position: absolute; height: 100px; width: 100px; background-color:green; clip-path: circle(40px); }
      .refresh-users-button-text-container{ position: absolute; height: 50px; width: 50px; display:flex; align-items: center; justify-content: center; }
      .refresh-users-button-text{ text-align: center; }

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
  public getCurrentUser(){
    return this.currentUser;
    //get it from login service
  }

  public getUsers() {//(usersResponse:Array<User>)
    this.userservice.getUsers().subscribe( (usersResponse:any) => {this.users = usersResponse.allUsers; console.log(this.users);});
    console.log("Getting Users");
  }

  public updateUsers(popupUser: any){
    console.log("Updating User");
    let tempUser: any = popupUser.sourceUser;
    // tempUser = Object.assign(tempUser, user);
    for (let key in tempUser){
      tempUser[key] = popupUser[key];
    }
    console.log(popupUser.sourceUser);
    console.log(tempUser);
    if(popupUser.rated && this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id!==popupUser.sourceUser.id) { this.addContact(tempUser.id, this.loginService.currentUser.id); }
    this.userservice.updateUsers(tempUser).subscribe( (res: any) => { 
      console.log(res); 
      this.loginService.pushToResponseBoxSuccess(`Updated User: ${res.users[0].id}`); 
      this.getUsers();
    });
    this.cancelUserPopup();
  }
  public deleteUser(userID:number){
    console.log(userID);
    this.userservice.deleteUser(userID).subscribe( (res: any) => { 
      console.log(res); 
      this.loginService.pushToResponseBoxSuccess(`Deleted User: ${res.message}`);
      this.getUsers();});
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
      this.loginService.pushToResponseBoxSuccess(`Added User: ${res.users[0].id}`);
      this.getUsers();
    });
    // this.cancelUserPopup();
  }
  public addContact(userAddTo: number, userToAdd: number){
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

    // let docUsersFormContacts = document.querySelector("#user-form-contacts");
    // docUsersFormContacts?.setAttribute("disabled", "");
    // let docUsersFormLastName = document.querySelector("#user-form-last-name");
    // docUsersFormLastName?.setAttribute("disabled", "");

    // let docUsersFormRate = document.querySelector("#user-form-rate");
    // if (this.loginService.isLoggedin) {
    //   docUsersFormRate?.removeAttribute("disabled");
    // } else {
    //   docUsersFormRate?.setAttribute("disabled", "");
    // }

    // let docUsersFormFirstName = document.querySelector("#user-form-first-name");
    // let docUsersFormTitle = document.querySelector("#user-form-title");
    // let docUsersFormQuote = document.querySelector("#user-form-quote");
    // let docUsersFormSecret = document.querySelector("#user-form-secret");
    // let docUsersFormSymbol = document.querySelector("#user-form-symbol");
    // let docUsersFormSymbolColor = document.querySelector("#user-form-symbol-color");
    // let docUsersFormCardColor = document.querySelector("#user-form-card-color");
    // let docUsersFormTextColor = document.querySelector("#user-form-text-color");
    // let docUsersFormBackgroundColor = document.querySelector("#user-form-symbol-background-color");
    // if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id === user.id) {
    //   docUsersFormFirstName?.removeAttribute("disabled");
    //   docUsersFormTitle?.removeAttribute("disabled");
    //   docUsersFormQuote?.removeAttribute("disabled");
    //   docUsersFormSecret?.removeAttribute("disabled");
    //   docUsersFormSymbol?.removeAttribute("disabled");
    //   docUsersFormSymbolColor?.removeAttribute("disabled");
    //   docUsersFormCardColor?.removeAttribute("disabled");
    //   docUsersFormTextColor?.removeAttribute("disabled");
    //   docUsersFormBackgroundColor?.removeAttribute("disabled");
    // } else {
    //   docUsersFormFirstName?.setAttribute("disabled", "");
    //   docUsersFormTitle?.setAttribute("disabled", "");
    //   docUsersFormQuote?.setAttribute("disabled", "");
    //   docUsersFormSecret?.setAttribute("disabled", "");
    //   docUsersFormSymbol?.setAttribute("disabled", "");
    //   docUsersFormSymbolColor?.setAttribute("disabled", "");
    //   docUsersFormCardColor?.setAttribute("disabled", "");
    //   docUsersFormTextColor?.setAttribute("disabled", "");
    //   docUsersFormBackgroundColor?.setAttribute("disabled", "");
    // }

    
    // let docUsersFormDelete = document.querySelector("#user-form-delete");
    // if (this.loginService.isLoggedin && this.loginService.currentUser && this.loginService.currentUser.id === user.id) {
    //   docUsersFormDelete?.removeAttribute("disabled");
    //   docUsersFormDelete?.setAttribute("class", "");
    // } else {
    //   docUsersFormDelete?.setAttribute("disabled", "");
    //   docUsersFormDelete?.setAttribute("class", "disable-button");
    // }



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
