import { Component, OnInit } from "@angular/core";
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
  currentUser: User;

  constructor (private userservice: UserService, private searchService: SearchService, private loginService: LoginService){ 
    searchService.searchTitlesUpdate$.subscribe(
      searchedUsers => {this.users = searchedUsers;
    });
    loginService.currentUserUpdate$.subscribe(
      newCurrentUser => {this.currentUser = newCurrentUser;
    });
  }

  public ngOnInit() {
    this.getUsers();
    
  }
  public getCurrentUser(){
    return this.currentUser;
    //get it from login service
  }

  public getUsers() {
    this.userservice.getUsers().subscribe( (usersResponse:Array<User>) => {this.users = usersResponse;});
    console.log("Getting Users");
  }

  //This extra http resquest is unnecessary, but is done this way to display some stuff in the back end
  public SearchUsers( searchValue: string, orderBy: string ) {
    this.userservice.searchUsers(searchValue, orderBy).subscribe( (usersResponse:Array<User>) => {this.users = usersResponse;});
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
      textColor: ""
    };
    tempUser = Object.assign(tempUser, user);
    this.userservice.updateUsers(tempUser).subscribe( (res: any) => { console.log(res); this.getUsers();});
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
