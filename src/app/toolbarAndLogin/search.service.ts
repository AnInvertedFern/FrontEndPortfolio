import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Title } from "../titles/titles";
import { TitlesComponent } from "../titles/titles.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class SearchService {

  constructor( private webService: WebService ) { 
  }
  usersSearch( value: string, options: Object ) {
    this.webService.getUsersSearch(value, options).subscribe(this.usersSearchHelper);

  }
  usersSearchHelper(res: any) {
    this.searchUsersUpdateSource.next(res);
  }
  titlesSearch( value: string, options: Object ) {
    this.webService.getTitlesSearch(value, options).subscribe(this.titlesSearchHelper);

  }
  titlesSearchHelper(res:any) {
    this.searchTitlesUpdateSource.next(res);
  }
  
  private searchUsersUpdateSource = new Subject<User[]>();
  private searchTitlesUpdateSource = new Subject<(Title[])[]>();
  searchUserUpdate$ = this.searchUsersUpdateSource.asObservable();
  searchTitlesUpdate$ = this.searchTitlesUpdateSource.asObservable();
  

}