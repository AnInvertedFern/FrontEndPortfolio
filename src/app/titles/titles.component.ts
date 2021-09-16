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
  DisplayTitlesInSearch: Title[] = [];

  constructor (private titlesservice: TitlesService, private searchService: SearchService){ 
    searchService.searchTitlesUpdate$.subscribe(
      searchedTitles => {
        this.DisplayTitlesInSearch = searchedTitles;
    });
  }

  public ngOnInit() {
    this.getTitles();
    if (this.titles.length > 0) {
      this.setTitleTo(this.titles[0]);
    }
    let docUsers = document.querySelector("titles");
    let newStyle = document.createElement("style");
    newStyle.textContent = "\
      .titles{ display:flex; }\
      .title-column{ display:flex; justify-content: center; align-items: center; flex:1; }\
      .title-column-main{}\
      .title-column-left{}\
      .title-column-right{}\
      .titles-border{ height: 100%; width: 10px; background-color: black; }\
    ";
    docUsers?.appendChild(newStyle);
  }
  public getTitles() {
    this.titlesservice.getTitles().subscribe( (titlesResponse:any) => {
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
    this.titlesservice.searchTitles(searchValue).subscribe( (titlesResponse:any) => {this.DisplayTitlesInSearch = titlesResponse;});
  }
  
}
