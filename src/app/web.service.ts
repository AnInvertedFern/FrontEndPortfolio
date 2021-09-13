import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class WebService {
    private users:User[] = [];
    private serverUrl: string = `http://localhost:8080/`;

    constructor( private http: HttpClient ) { 
    }


    public getUsers(){ //needs to also pass in current user, to get the secret
        return this.http.get<User[]>(`${this.serverUrl}api/users/all`);
    }
    public addContact(userAddTo: User, userToAdd: User){
        return this.http.post<User[]>(`${this.serverUrl}api/addcontact/`, {userAddTo, userToAdd} );
    }
    public updateUsers(user:User) { //needs to also pass in current user, to see if certian fields can be updated
        return this.http.post<User[]>(`${this.serverUrl}api/users/`, user );
    }
    public addUser(user:User){
        return this.http.put<User[]>( `${this.serverUrl}api/users/`, user);
    }
    public deleteUser(user:User, callback:Function){ //needs to also pass in current user, to see if the non-admin user can delete that user
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('user' +':'+'password') });
        this.http.delete<User>( `${this.serverUrl}api/users/${user.id}`  , {headers: headers1}).subscribe(callback);

    }
    public searchUser(searchValue, orderBy){ //needs to also pass in current user, to see if a secret needs to be gotten
        return this.http.get<User[]>(`${this.serverUrl}api/users/search/`, {searchValue, orderBy});
    }
    public getThemes(){
        return this.http.get<User[]>(`${this.serverUrl}api/themes/all/`);
    }
    public updateLastTheme(currentUser, currentTheme){
        //just use update user
    }
    public getTitles(){
        return this.http.get<User[]>(`${this.serverUrl}api/titles/all/`);
    }
    public searchTitles(searchValue){
        return this.http.get<User[]>(`${this.serverUrl}api/titles/search/`, {searchValue});
    }
    public attemptLogin_GetRole(credentials){
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('${credentials.userID}' +':'+'${credentials.password}') });
        return this.http.get<User[]>(`${this.serverUrl}login/get_role/`);
    }
    public getUserByID(ID:number){ //needs to also pass in current user, although in the current setup it is only used for the current user
        return this.http.get<User[]>(`${this.serverUrl}api/users/${ID}/`);
    }
    public getUsersSearch(value, options){ //needs to also pass in current user, to see if a secret needs to be gotton
        return this.http.get<User[]>(`${this.serverUrl}api/users/search/`, {value, options});
    }
    public getTitlesSearch(value, options){
        return this.http.get<User[]>(`${this.serverUrl}api/titles/search/`, {value, options});
    }


}