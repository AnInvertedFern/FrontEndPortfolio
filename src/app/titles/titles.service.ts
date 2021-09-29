import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TitlesReply, WebService } from "../web.service";

@Injectable({providedIn:'root'})
export class TitlesService {

    constructor( private webService: WebService ) { 
    }

    public getTitles() : Observable<HttpResponse<TitlesReply>> {
      return this.webService.getTitles();
    }
}