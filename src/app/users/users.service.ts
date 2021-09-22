import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../toolbarAndLogin/login.service";
import { WebService } from "../web.service";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class UserService {

    constructor( private webService: WebService, private loginService: LoginService ) { 
    }

    public getUsers() { // : Observable<User[]> {
        return this.webService.getUsers( this.loginService.checkedCredentials );
    }
    public addContact(userAddTo: User, userToAdd: User) {//: Observable<User[]> {
        return this.webService.addContact(userAddTo, userToAdd, this.loginService.checkedCredentials);
    }
    
    public updateUsers(user: User) {
        return this.webService.updateUsers(user, this.loginService.checkedCredentials);
    }

    public addUser(user: User | any ) {
        return this.webService.addUser(user);
    }
 
    public deleteUser(userID: number ) {
        return this.webService.deleteUser(userID, this.loginService.checkedCredentials);
    }
  
    // public searchUsers( searchValue: string, orderBy: string ) {
    //   return this.webService.searchUser(searchValue, orderBy);
    // }

}