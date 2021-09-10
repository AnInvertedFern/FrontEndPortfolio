import { Injectable } from "@angular/core";
import { WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class TitlesService {

    constructor( private webService: WebService ) { 
    }

    public getTitles() {
        return this.webService.getTitles();
    }
    public searchTitles( searchValue: string ) {
      return this.webService.searchTitles(searchValue);
    }

}