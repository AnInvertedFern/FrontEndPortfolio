import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Title } from "../titles/titles";
import { TitlesComponent } from "../titles/titles.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { WebService } from "../web.service";
import { LoginService } from "./login.service";

@Injectable({providedIn:'root'})
export class SearchService {

  constructor( private webService: WebService, private loginService: LoginService ) { 
    console.log(this.searchUsersUpdateSource);
  }
  usersSearch( value: string) {//, options: Object 
    console.log(this.searchUsersUpdateSource);
    console.log(value);
    this.webService.getUsersSearch(value, this.loginService.checkedCredentials).subscribe((res: any) => {console.log(this.searchUsersUpdateSource);this.usersSearchHelper(res)});//, options

  }
  usersSearchHelper(res: any) {
    console.log(this.searchUsersUpdateSource);
    console.log(res);
    this.searchUsersUpdateSource.next(res);
  }
  titlesSearch( value: string) {//, options: Object 
    console.log(value);
    this.webService.getTitlesSearch(value, this.loginService.checkedCredentials).subscribe( (res: any) => {console.log(this.searchTitlesUpdateSource);this.titlesSearchHelper(res)});//, options

  }
  titlesSearchHelper(res:any) {
    console.log(res);
    this.searchTitlesUpdateSource.next(res);
  }
  
  private searchUsersUpdateSource = new Subject<User[]>();
  private searchTitlesUpdateSource = new Subject<(Title[])[]>();
  searchUserUpdate$ = this.searchUsersUpdateSource.asObservable();
  searchTitlesUpdate$ = this.searchTitlesUpdateSource.asObservable();
  

}