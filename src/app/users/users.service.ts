import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WebService } from "../web.service";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class UserService {

    constructor( private webService: WebService ) { 
    }

    public getUsers() : Observable<User[]> {
        return this.webService.getUsers();
    }
    public addContact(userAddTo: number, userToAdd: number) : Observable<User[]> {
        return this.webService.addContact(userAddTo, userToAdd);
    }
    
    public updateUsers(user: User) {
        return this.webService.updateUsers(user);
    }

    public addUser(user: User | any ) {
        return this.webService.addUser(user);
    }
 
    public deleteUser(userID: number ) {
        return this.webService.deleteUser(userID);
    }
  
    // public searchUsers( searchValue: string, orderBy: string ) {
    //   return this.webService.searchUser(searchValue, orderBy);
    // }

}