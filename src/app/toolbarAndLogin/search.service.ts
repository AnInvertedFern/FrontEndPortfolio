import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class SearchService {
  usersComponent: UserComponent;
  titlesComponent: TitlesComponent

  constructor( private webService: WebService ) { 
  }
  usersSearch( value: string, options: Object ) {
    this.searchUsersUpdateSource.next(this.webService.getUsersSearch(value, options));

  }
  titlesSearch( value: string, options: Object ) {
    this.searchTitlesUpdateSource.next(this.webService.getTitlesSearch(value, options));

  }
  
  private searchUsersUpdateSource = new Subject<string>();
  private searchTitlesUpdateSource = new Subject<string>();
  searchUserUpdate$ = this.searchUsersUpdateSource.asObservable();
  searchTitlesUpdate$ = this.searchTitlesUpdateSource.asObservable();
  

}