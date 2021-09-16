import { style } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
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

  constructor (private userservice: UserService, private searchService: SearchService, private loginService: LoginService){ 
    loginService.currentUserUpdate$.subscribe(
      newCurrentUser => {this.currentUser = newCurrentUser;
    });
  }

  public ngOnInit() {
    // this.getUsers();
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    this.users.push(
      {
        id: -1,
        firstName: "Bob",
        lastName: "Smith",
        title: "Cook",
        contacts: [-1,-1,-1],
        contactNum: 3,
        quote: "Hi, I am Bob",
        secret: "This is a secret",
        lastTheme: undefined,
        symbol: "O",
        symbolColor: "Green",
        cardColor: "Black",
        textColor: "White",
        symbolBackgroundColor: "purple",
      }
    );
    
    let docUsers = document.querySelector("users");
    let newStyle = document.createElement("style");
    newStyle.textContent = "\
      .users{ display:flex; flex-direction: column; align-items: center; }\
      .card-container{ display:flex; flex-wrap: wrap; flex-direction: row; justify-content:center; }\
      .card{ height: 250px; width: 200px; display:flex; border-radius: 4px; background-color: cyan; margin: 10px 8px 16px; }\
      .inner-card{ height: 230px; width: 180px; display:flex; flex:1; flex-direction: column; align-items: center; }\
      .card-top{ width:100%; display:flex; flex-direction: row; align-items: center; justify-content: center; }\
      .user-symbol-container{ display:flex; flex:1; align-items: center; justify-content: center; }\
      .user-symbol{ height: 50px; width: 50px; border-radius: 50px; background-color: magenta; display:flex; align-items: center; justify-content: center; }\
      .user-bio{ display:flex; flex:1; flex-direction: column; align-items: center; justify-content: center; }\
      .user-about{display:flex; flex:1; flex-direction: column; }\
      .new-user-button-container{ height: 230px; width: 180px; position: fixed; bottom:20px; right: 20px; display:flex; align-items: center; justify-content: center; }\
      .new-user-button{ position: absolute; height: 100px; width: 100px; clip-path: circle(50px); background-color: crimson; }\
      .new-user-button-text-container{ position: absolute; height: 70px; width: 70px; display:flex; align-items: center; justify-content: center; }\
      .new-user-button-text{ text-align: center; }\
      .seperator{ height: 10px; width:100%; background-color: orange; }\
      .user-footer{ display:flex; align-items: center; justify-content: center; }\
    ";
    docUsers?.appendChild(newStyle);
    
  }
  public getCurrentUser(){
    return this.currentUser;
    //get it from login service
  }

  public getUsers() {
    this.userservice.getUsers().subscribe( (usersResponse:Array<User>) => {this.users = usersResponse;});
    console.log("Getting Users");
  }

  public updateUsers(user: User){
    console.log("Updating User");
    let tempUser: User = {
      id: -1,
      firstName: "",
      lastName: "",
      title: "",
      contacts: undefined,
      contactNum: -1,
      quote: "",
      secret: "",
      lastTheme: undefined,
      symbol: "",
      symbolColor: "",
      cardColor: "",
      textColor: "",
      symbolBackgroundColor: "",
    };
    tempUser = Object.assign(tempUser, user);
    this.userservice.updateUsers(tempUser).subscribe( (res: any) => { console.log(res); this.getUsers();});
  }
  public toggleNewUserPopup(){
    console.log("Opening new User Popup");
    this.NewUserPopup = true;
  }
  
  public addUser(user: User){
    console.log("Adding User");
    this.userservice.addUser(user).subscribe( (res: any) => { console.log(res); this.getUsers();});
  }
  public addContact(userAddTo: User, userToAdd: User){
    console.log("Adding Contact");
    this.userservice.addContact(userAddTo, userToAdd).subscribe( (res: any) => { console.log(res); this.getUsers();});
  }

  public selectUser(user:User) {
    this.selectedUser = user;
  }

}
