import { Injectable } from "@angular/core"

@Injectable({providedIn:'root'})
export class LoginService {

  

  username: string (for Basic Auth)
  password: string (for Basic Auth)
  isAdmin: boolean
  isLoggedin: boolean
  constructor() { 
  }
  IsAdmin()
  getCurrentUser()
  setCredentials(username: string, password: string){
    this.password = password;
    this.username = username;
  }

}