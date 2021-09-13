import { Component, OnInit } from "@angular/core";
import { SearchService } from "../toolbarAndLogin/search.service";
import { Title } from "./titles";
import { TitlesService } from "./titles.service";

@Component({
  selector: 'titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css'],
  providers: [TitlesService]
})
export class TitlesComponent implements OnInit{
  titles: Array<Title> = [];
  currentSelectedTitle: Title | undefined;
  leftTitle: Title | undefined;
  rightTitle: Title | undefined;
  DisplayTitlesInSearch: Array<Title> = [];

  constructor (private titlesservice: TitlesService, private searchService: SearchService){ 
    searchService.searchTitlesUpdate$.subscribe(
      searchedTitles => {this.DisplayTitlesInSearch = searchedTitles;
    });
  }

  public ngOnInit() {
    this.getTitles();
    if (this.titles.length > 0) this.setTitleTo(this.titles[0]);
  }
  public getTitles() {
    this.titlesservice.getTitles().subscribe( (titlesResponse:Array<Title>) => {
      this.titles = titlesResponse;
      if (this.currentSelectedTitle !== undefined){
        if ( this.titles.indexOf(this.currentSelectedTitle) === -1 ){
          if (this.titles.length > 0) this.setTitleTo(this.titles[0]);
        }
      }
    });
  }

  public setTitleTo( selectedTitle: Title ){
    this.currentSelectedTitle = selectedTitle;
    this.setLeftRightTitles();
  }
  private setLeftRightTitles(){
    if (this.currentSelectedTitle != undefined){
      let titleIndex = this.titles.indexOf(this.currentSelectedTitle);
      this.leftTitle = (titleIndex-1 > 0) ? this.titles[titleIndex-1] : this.titles[this.titles.length];
      this.rightTitle = (titleIndex+1 < this.titles.length) ? this.titles[titleIndex+1] : this.titles[0];
    }
  }
  public searchTitles( searchValue: string ) {
    this.titlesservice.searchTitles(searchValue).subscribe( (titlesResponse:Array<Title>) => {this.DisplayTitlesInSearch = titlesResponse;});
  }
  
}
