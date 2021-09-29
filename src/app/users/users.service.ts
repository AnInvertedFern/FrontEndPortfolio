import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Credentials, LoginService } from "../toolbarAndLogin/login.service";
import { UserReply, WebService } from "../web.service";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class UserService {

    constructor( private webService: WebService, private loginService: LoginService ) { 
    }

    public getUsers() : Observable<HttpResponse<UserReply>> {
        return this.webService.getUsers( <Credentials> this.loginService.checkedCredentials );
    }
    public addContact(userAddTo: User, userToAdd: User) : Observable<HttpResponse<UserReply>> {
        return this.webService.addContact(userAddTo, userToAdd, <Credentials> this.loginService.checkedCredentials);
    }
    
    public updateUsers(user: User) : Observable<HttpResponse<UserReply>> {
        return this.webService.updateUsers(user, <Credentials> this.loginService.checkedCredentials);
    }
    // Since primaryUser lacks an id, it is not yet a user and must be passed in as an "any"
    // Because of that it cannot be placed in a password and user wrapper
    public addUser(user: User | any ) : Observable<HttpResponse<UserReply>> {
        return this.webService.addUser(user);
    }
 
    public deleteUser(userID: number ) : Observable<HttpResponse<UserReply>> {
        return this.webService.deleteUser(userID, <Credentials> this.loginService.checkedCredentials);
    }
}