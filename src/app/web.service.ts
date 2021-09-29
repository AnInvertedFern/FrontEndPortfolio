import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Theme } from "./themes/theme";
import { Title } from "./titles/titles";
import { Credentials, LoginService } from "./toolbarAndLogin/login.service";
import { User } from "./users/user";

@Injectable({providedIn:'root'})
export class WebService {
    private users:User[] = [];
    private serverUrl: string = `http://localhost:8080/`;

    constructor( private http: HttpClient) {
    }

    public getUsers(credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.get<UserReply>(`${this.serverUrl}api/users/all/`  , {headers: headers1, observe:'response'});
        }
        else { return this.http.get<UserReply>(`${this.serverUrl}api/users/all/`  , {observe:'response'}); }

    }
    public addContact(userAddTo: User, userToAdd: User, credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.post<UserReply>(`${this.serverUrl}api/users/addcontact/`, {primaryUser:userAddTo, secondaryUser:userToAdd} , {headers: headers1, observe:'response'} );
        }
        else { return this.http.post<UserReply>(`${this.serverUrl}api/users/addcontact/`, {primaryUser:userAddTo, secondaryUser:userToAdd} , {observe:'response'} ); }
    }
    public updateUsers(user:User, credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.post<UserReply>(`${this.serverUrl}api/users/`, user, {headers: headers1, observe:'response'} );
        }
        else { return this.http.post<UserReply>(`${this.serverUrl}api/users/`, user, {observe:'response'} ); }
    }
    // Expected format: { message: "password", primaryUser: "user" } 
    public addUser(user:any) : Observable<HttpResponse<UserReply>> {
        return this.http.put<UserReply>( `${this.serverUrl}api/users/`, user, {observe:'response'});
    }
    public deleteUser(userID:number, credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.delete<UserReply>( `${this.serverUrl}api/users/${userID}`  , {headers: headers1, observe:'response'});
        }
        else { return this.http.delete<UserReply>( `${this.serverUrl}api/users/${userID}`  , {observe:'response'}); }
    }
    public getTitles() : Observable<HttpResponse<TitlesReply>> {
        return this.http.get<TitlesReply>(`${this.serverUrl}api/titles/all/`, {observe:'response'});
    }
    public getTitlesSearch(value: string, credentials: Credentials) : Observable<HttpResponse<TitlesReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.post<TitlesReply>(`${this.serverUrl}api/titles/search/`, {}, {params: {searchValue: value}, headers: headers1, observe:'response' } );
        }
        else { return this.http.post<TitlesReply>(`${this.serverUrl}api/titles/search/`, {}, {params: {searchValue: value}, observe:'response' } ); }
        
    }
    public attemptLogin_GetRole(credentials: Credentials) : Observable<HttpResponse<getRoleReply>> {
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
        return this.http.get<getRoleReply>(`${this.serverUrl}login/get_role/`  , {headers: headers1, observe:'response'});
    }
    public attemptLogout(credentials: Credentials) : Observable<HttpResponse<string>> {
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
        return this.http.get<string>(`${this.serverUrl}logout/`  , {headers: headers1, observe:'response'});
    }
    public getUsersSearch(value: string, credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.post<UserReply>(`${this.serverUrl}api/users/search/`, {}, {params: {searchValue: value}, headers: headers1, observe:'response' } );
        }
        else { return this.http.post<UserReply>(`${this.serverUrl}api/users/search/`, {}, {params: {searchValue: value}, observe:'response' } ); }
        
    }
    public updateLastTheme(currentUser: User, currentTheme: number, credentials: Credentials) : Observable<HttpResponse<UserReply>> {
        //just use update user
        currentUser.lastTheme = currentTheme;
        return this.updateUsers(currentUser, credentials);
    }
    public getThemes() : Observable<HttpResponse<Theme[]>> {
        return this.http.get<Theme[]>(`${this.serverUrl}api/themes/all/`, {observe:'response'});
    }
    public updateThemes(themes: Theme, credentials: Credentials) : Observable<HttpResponse<Theme>> {
        if (credentials) {
            const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${credentials.userID}` +`:`+`${credentials.password}`) });
            return this.http.post<Theme>(`${this.serverUrl}api/themes/`, themes, {headers: headers1, observe:'response'} );
        }
        else { return this.http.post<Theme>(`${this.serverUrl}api/themes/`, themes, {observe:'response'} ); }   
    }
}

export class UserReply {
    message: String | undefined;
    success: boolean | undefined;
    users: User[] | undefined;
    allUsers: User[] | undefined;
}
export class TitlesReply {
  message: String | undefined;
  success: boolean | undefined;
  titles: Title[] | undefined;
  allTitles: Title[] | undefined;
}
export class getRoleReply {
    message: String | undefined;
    success: boolean | undefined;
    admin: boolean | undefined;
    currentUser: User | undefined;
}