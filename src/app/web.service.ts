import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Theme } from "./themes/theme";
import { Title } from "./titles/titles";
import { LoginService } from "./toolbarAndLogin/login.service";
import { User } from "./users/user";

@Injectable({providedIn:'root'})
export class WebService {
    private users:User[] = [];
    private serverUrl: string = `http://localhost:8080/`;

    constructor( private http: HttpClient) { //, private loginService: LoginService 
    }


    //How to login information to webservice for user data selection?
    //have all services pass in current user and credentials since they are all connected to login

    public getUsers(){ //needs to also pass in current user, to get the secret
        return this.http.get<User[]>(`${this.serverUrl}api/users/all`);
    }
    public addContact(userAddTo: number, userToAdd: number){
        return this.http.post<User[]>(`${this.serverUrl}api/users/addcontact/`, {userAddTo, userToAdd} );
    }
    public updateUsers(user:User) { //needs to also pass in current user, to see if certian fields can be updated
        return this.http.post<User[]>(`${this.serverUrl}api/users/`, user );
    }
    public addUser(user:User){
        console.log(user);
        return this.http.put<User[]>( `${this.serverUrl}api/users/`, user);
    }
    // public deleteUser(user:User, callback:any){ //needs to also pass in current user, to see if the non-admin user can delete that user
    //     const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('user' +':'+'password') });
    //     this.http.delete<User>( `${this.serverUrl}api/users/${user.id}`  , {headers: headers1}).subscribe(callback);
    // }
    
    public deleteUser(userID:number){ //needs to also pass in current user, to see if the non-admin user can delete that user
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('user' +':'+'password') });
        return this.http.delete<User>( `${this.serverUrl}api/users/${userID}`  , {headers: headers1});
    }
    public searchUser(searchValue: string, orderBy: Object){ //needs to also pass in current user, to see if a secret needs to be gotten
        return this.http.post<User[]>(`${this.serverUrl}api/users/search/`, {searchValue, orderBy});
    }
    public getTitles(){
        return this.http.get<User[]>(`${this.serverUrl}api/titles/all/`);
    }
    // public searchTitles(searchValue: string){
    //     return this.http.post<User[]>(`${this.serverUrl}api/titles/search/`, {searchValue});
    // }
    //Wants back an array of an array of titles: first index being all titles, second index being searched filtered titled
    public getTitlesSearch(value: string, options: Object){
        console.log(value);
        return this.http.post<Title[]>(`${this.serverUrl}api/titles/search/`, {value, options}, {params: {searchValue: value} } );
    }
    // Wants back loginSucess:boolean, isAdmin:boolean, currentUser:User
    public attemptLogin_GetRole(credentials: any){
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('${credentials.userID}' +':'+'${credentials.password}') });
        return this.http.get<User[]>(`${this.serverUrl}login/get_role/`);
    }
    public getUserByID(ID:number){ //needs to also pass in current user, although in the current setup it is only used for the current user
        return this.http.get<User[]>(`${this.serverUrl}api/users/${ID}/`);
    }
    //Wants a array of Users
    public getUsersSearch(value: string, options: Object){ //needs to also pass in current user, to see if a secret needs to be gotton
        return this.http.post<User[]>(`${this.serverUrl}api/users/search/`, {value, options}, {params: {searchValue: value} } );
    }
    public updateLastTheme(currentUser: User, currentTheme: Theme){
        //just use update user
    }
    public getThemes(){
        return this.http.get<User[]>(`${this.serverUrl}api/themes/all/`);
    }
    public updateThemes(themes: Theme[]){
        return this.http.post<User[]>(`${this.serverUrl}api/themes/`, themes );
    }


}