import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ThemesService } from "../themes/themes.service";
import { SearchService } from "../toolbarAndLogin/search.service";
import { TitlesReply } from "../web.service";
import { Title } from "./titles";
import { TitlesService } from "./titles.service";

@Component({
  selector: 'titles',
  templateUrl: './titles.component.html',
})
export class TitlesComponent implements OnInit{
  titles: Array<Title> = [];
  currentSelectedTitle: number = 0;
  leftTitle: number = -1;
  rightTitle: number = -1;
  DisplayTitlesInSearch: Title[] = [];
  dummyTitle:Title = {
    title: "",
    users: [],
  }
  
  searchPopup: boolean = false;

  constructor (private titlesservice: TitlesService, private searchService: SearchService){
  }

  public ngOnInit() : void {
    this.searchService.searchTitlesUpdate$.subscribe(
      (searchedTitles:HttpResponse<TitlesReply>) => {
        this.titles = <Title[]> searchedTitles.body?.allTitles;
        this.DisplayTitlesInSearch = <Title[]> searchedTitles.body?.titles;
        
        if (!this.titles || this.titles.length ===0){
          this.titles = [this.dummyTitle];
          this.currentSelectedTitle=0;
        }
        if (!this.DisplayTitlesInSearch || this.DisplayTitlesInSearch.length ===0){
          this.DisplayTitlesInSearch = [this.dummyTitle];
        }
        this.searchPopup = true;
        this.setTitleTo(this.currentSelectedTitle);
    });
    this.setTitleTo(this.currentSelectedTitle);

    this.titlesservice.getTitles().subscribe( (titlesResponse:HttpResponse<TitlesReply>) => {
      this.titles = <Title[]> titlesResponse.body?.allTitles;
      this.setTitleTo(this.currentSelectedTitle);
    });

    let docTitles = document.querySelector(".titles");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .titles{ overflow:visible; display:flex; justify-content:center; }
      .search-results{ justify-content:center; width:70%; height:70%; border: 2px solid black; position:absolute; top:100px; display:none; z-index:1; }
      .search-results-visible{ display:flex; }
      .search-results-subcontainer{ height:100%; width:100%; display:flex; justify-content:space-around; flex-direction:column; align-items:center; }
      .search-item:hover { height: 30px; width:100%; transform: translateY(.2rem); }
      .title-column{ overflow:visible; display:flex; flex:1; flex-direction:column; align-items:center; }
      .title-column-main{ border-right-color: black; border-right-style: solid; border-right-width: 10px; border-left-color: black; border-left-style: solid; border-left-width: 10px; box-shadow: inset 15px 0 10px -10px black, inset -15px 0 10px -10px black, inset 20px 0 20px -20px white, inset -20px 0 20px -20px white, 0 0 10px 10px black, 0 0 10px 10px white; }
      .title-column-left:hover, .title-column-right:hover { transform: translateY(.5rem); }
      .titles-border{ display:none; height: 100%; width: 10px; background-color: black; box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray; }
      .titles-user-detail-container{ overflow:visible; display:flex; flex-direction:column; }
    `;
    docTitles?.appendChild(newStyle);
  }
  public setTitleTo( selectedTitle: number ) : void {
    this.currentSelectedTitle = selectedTitle;
    if (!this.titles || this.titles.length ===0){
      this.titles = [this.dummyTitle];
    }
    this.setLeftRightTitles();
  }
  private setLeftRightTitles() : void {
    if (this.currentSelectedTitle != undefined){
      this.leftTitle = (this.currentSelectedTitle-1 >= 0) ? this.currentSelectedTitle-1 : this.titles.length-1;
      this.rightTitle = (this.currentSelectedTitle+1 <= this.titles.length-1) ? this.currentSelectedTitle+1 : 0;
    }
  }
  public getIndexOfTitleByName(name:string): number{
    let index:number = 0;
    for (let title of this.titles){
      if (title.title === name){
        return index;
      }
      index++;
    }
    return -1;
  }
  public searchPopupEvent() : void {
    this.searchPopup = !this.searchPopup;
  }
  
}
