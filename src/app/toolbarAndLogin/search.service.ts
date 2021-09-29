import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Title } from "../titles/titles";
import { TitlesComponent } from "../titles/titles.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { TitlesReply, UserReply, WebService } from "../web.service";
import { Credentials, LoginService } from "./login.service";

@Injectable({providedIn:'root'})
export class SearchService {

  constructor( private webService: WebService, private loginService: LoginService ) { 
  }
  usersSearch( value: string) : void {
    this.webService.getUsersSearch(value, <Credentials> this.loginService.checkedCredentials).subscribe((res: HttpResponse<UserReply>) => {this.usersSearchHelper(res)});

  }
  usersSearchHelper(res: HttpResponse<UserReply>) : void {
    this.searchUsersUpdateSource.next(res);
  }
  titlesSearch( value: string) : void {
    this.webService.getTitlesSearch(value, <Credentials> this.loginService.checkedCredentials).subscribe( (res: HttpResponse<TitlesReply>) => {this.titlesSearchHelper(res)});

  }
  titlesSearchHelper(res:HttpResponse<TitlesReply>) : void {
    this.searchTitlesUpdateSource.next(res);
  }
  
  private searchUsersUpdateSource = new Subject<HttpResponse<UserReply>>();
  private searchTitlesUpdateSource = new Subject<HttpResponse<TitlesReply>>();
  searchUserUpdate$ = this.searchUsersUpdateSource.asObservable();
  searchTitlesUpdate$ = this.searchTitlesUpdateSource.asObservable();
  

}