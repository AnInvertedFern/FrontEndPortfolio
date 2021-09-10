import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({providedIn:'root'})
export class WebService {
    private users:User[] = [];
    private serverUrl: string = `http://localhost:8080/`;

    constructor( private http: HttpClient ) { 
    }

    public getUsers() : Observable<User[]> {
        return this.http.get<User[]>(this.serverUrl, //{headers: {"Content-Type": "application/json",
            // "Accept": "application/json",
            // "Access-Control-Allow-Origin": "/" }, 
            // observe: 'body', responseType: 'json'}
            );
    }
    public addContact(userAddTo: User, userToAdd: User) : Observable<User[]> {
      
    }
    public updateUsers(user: User) {
        // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin':'*','Authorization': 'Basic' + btoa('user' +':'+'password') });
        // return this.http.post<User>( this.serverUrl, user, {headers});
        return this.http.post<User>( this.serverUrl, user, {headers: {"Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "/" }, 
            observe: 'body', responseType: 'json'} 
            );
    }
    public sendForm(username: string, password: string) {
        // return this.http.post<User>( `${this.serverUrl}login`, {headers: 
        //     new HttpHeaders({ authorization: 'Basic ' + btoa(username+":"+password) })
        // }, 
        // );
        return fetch( `${this.serverUrl}login`, {headers: 
            { "Authorization": 'Basic ' + btoa(username+":"+password) }
        }, 
        );
    }
    public addUser(user: any ) {
        return this.http.put( this.serverUrl, user//, {headers: {"Content-Type": "application/json",
            // "Accept": "application/json",
            // "Access-Control-Allow-Origin": "/" }, 
            // observe: 'body', responseType: 'json'} 
            );
    }
 
    public deleteUser(user: any , callback: any) {
        // return this.http.delete( `${this.serverUrl}${user.id}`, {headers: {"Content-Type": "application/json",
        //     "Accept": "application/json",
        //     "Access-Control-Allow-Origin": "/" }, observe: 'body', responseType: 'json'} );

        
        // http.get('token').subscribe( (data: tempData) => {
        //     const token = data['token'];
        //     http.get('http://localhost:9000', {headers : new HttpHeaders().set('X-Auth-Token', token) })
        //     .subscribe(response => this.greeting = response);
        // }, () => {});

        // this.http.delete<User>(`${this.serverUrl}${user.id}`, {headers : new HttpHeaders( {"Authorization": 'Basic ' + btoa("user"+":"+"password") } ) })
        //     .subscribe(callback);


        // return this.http.get(`${this.serverUrl}token`, {headers: {"Authorization": 'Basic ' + btoa("user"+":"+"password")}  }).subscribe( data => {
        //     let newdata = <tempData> data;
        //     const token = newdata['token'];
        //     this.http.delete<User>(`${this.serverUrl}${user.id}`, {headers : new HttpHeaders( {'X-Auth-Token': token, "Authorization": 'Basic ' + btoa("user"+":"+"password") } ) })
        //     .subscribe(callback);
        // });



        // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin':'*','Authorization': 'Basic' + btoa('user' +':'+'password') });
        // return this.http.delete<User>( `${this.serverUrl}${user.id}`  , {headers});

        
        const headers1 = new HttpHeaders({ 'Authorization': 'Basic ' + btoa('user' +':'+'password') });
        this.http.delete<User>( `${this.serverUrl}${user.id}`  , {headers: headers1}).subscribe(callback);
    }

}