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
  currentSelectedTitle: number = 0;
  leftTitle: number = -1;
  rightTitle: number = -1;
  DisplayTitlesInSearch: Title[] = [];
  
  searchPopup: boolean = false;

  constructor (private titlesservice: TitlesService, private searchService: SearchService){ 
    searchService.searchTitlesUpdate$.subscribe(
      searchedTitles => {
        this.titles = searchedTitles[0];
        this.DisplayTitlesInSearch = searchedTitles[1];
        this.searchPopup = true;
    });
    this.setLeftRightTitles();
  }

  public ngOnInit() {
    this.titles.push(
      {
        id:-1,
        title: "cook",
        users: [
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
        ]
      }
    );
    this.titles.push(
      {
        id:-1,
        title: "bus driver",
        users: [
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
        ]
      }
    );
    this.titles.push(
      {
        id:-1,
        title: "clock maker",
        users: [
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
        ]
      }
    );
    this.titles.push(
      {
        id:-1,
        title: "carver",
        users: [
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
          {
            id: -1,
            firstName: "Bob",
            lastName: "Smith",
            title: "Cook",
            contacts: [-1,-1,-1],
            contactNum: 3,
            quote: "Hi, I am Bob",
            secret: "This is a secret",
            lastTheme: undefined,
            symbol: "O",
            symbolColor: "Green",
            cardColor: "Black",
            textColor: "White",
            symbolBackgroundColor: "purple",
          },
        ]
      }
    );
    this.setLeftRightTitles();

    
    this.getTitles();
    if (this.titles.length > 0) {
      // this.setTitleTo(this.titles[0]);
      this.setTitleTo(0);
    }
    let docTitles = document.querySelector(".titles");
    let newStyle = document.createElement("style");
    newStyle.textContent = `
      .titles{ display:flex; justify-content:center; }
      .search-results{ justify-content:center; width:70%; height:70%; border: 2px solid black; position:absolute; top:100px; display:none; }
      .search-results-visible{ display:flex; }
      .search-results-subcontainer{ height:100%; display:flex; justify-content:space-around; flex-direction:column; align-items:center; }
      .title-column{ overflow:auto; display:flex; flex:1; flex-direction:column; align-items:center; }
      .title-column-main{}
      .title-column-left{}
      .title-column-right{}
      .titles-border{ height: 100vh; width: 10px; background-color: black; box-shadow: 0 1px 2px 4px darkslategray, 0 1px 5px 10px lightslategray; }
      .titles-user-detail-container{ display:flex; flex-direction:column; }
    `;
    docTitles?.appendChild(newStyle);
  }
  public getTitles() {
    this.titlesservice.getTitles().subscribe( (titlesResponse:any) => {
      this.titles = titlesResponse;
      // if (this.currentSelectedTitle !== undefined){
      //   if ( this.titles.indexOf(this.currentSelectedTitle) === -1 ){
      //     if (this.titles.length > 0) this.setTitleTo(this.titles[0]);
      //   }
      // }
      this.setTitleTo(0);
    });
  }

  public setTitleTo( selectedTitle: number ){
    this.currentSelectedTitle = selectedTitle;
    this.setLeftRightTitles();
  }
  private setLeftRightTitles(){
    if (this.currentSelectedTitle != undefined){
      // let titleIndex = this.titles.indexOf(this.currentSelectedTitle);
      this.leftTitle = (this.currentSelectedTitle-1 >= 0) ? this.currentSelectedTitle-1 : this.titles.length-1;
      this.rightTitle = (this.currentSelectedTitle+1 <= this.titles.length-1) ? this.currentSelectedTitle+1 : 0;
    }
  }
  // public searchTitles( searchValue: string ) {
  //   this.titlesservice.searchTitles(searchValue).subscribe( (titlesResponse:any) => {this.DisplayTitlesInSearch = titlesResponse;});
  // }
  
  public searchPopupEvent() {
    this.searchPopup = !this.searchPopup;
  }
  
}
