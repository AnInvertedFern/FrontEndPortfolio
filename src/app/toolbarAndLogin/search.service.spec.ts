import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DummyComponent } from "../dummy.component";
import { ThemeComponent } from "../themes/themes.component";
import { TitlesComponent } from "../titles/titles.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { SearchService } from "./search.service";
import { ToolbarComponent } from "./toolbar.component";

describe('SearchService testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let searchService: SearchService;
  let userComponent: UserComponent;
  let userFixture: ComponentFixture<UserComponent>;
  let titlesComponent: TitlesComponent;
  let titlesFixture: ComponentFixture<TitlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'users', component: UserComponent },
            { path: 'titles', component: TitlesComponent },
            { path: 'themes', component: ThemeComponent },
            { path: 'dummy-component', component: DummyComponent },
            { path: '',   redirectTo: 'users', pathMatch: 'full' },
          ]
        ),
        BrowserTestingModule,
      ], 
      providers: [
        ToolbarComponent,
        SearchService,
        UserComponent,
        TitlesComponent,
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    searchService = TestBed.inject(SearchService);

    userFixture = TestBed.createComponent(UserComponent);
    userComponent = userFixture.componentInstance;
    userFixture.detectChanges();
    titlesFixture = TestBed.createComponent(TitlesComponent);
    titlesComponent = titlesFixture.componentInstance;
    titlesFixture.detectChanges();
  });
  it('SearchService Tests', () => {
    //Purging requests from other services
    httpTestingController.expectOne("http://localhost:8080/api/themes/all/");
    httpTestingController.expectOne("http://localhost:8080/api/users/all/");
    httpTestingController.expectOne("http://localhost:8080/api/titles/all/");

    let tempUser1: User = {
      id:1,
      firstName: "ASD",
      lastName: "afga",
      title: "afh",
      contacts: [2],
      contactNum: 1,
      quote: "aghsgf",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "k",
      symbolColor: "avbbv",
      cardColor: "ahjfh",
      textColor: "ahgf",
  
      symbolBackgroundColor:"",
    };
    let tempUser2: User = {
      id:2,
      firstName: "dfghdg",
      lastName: "djfgh",
      title: "dfgbgh",
      contacts: [],
      contactNum: 0,
      quote: "dnbg",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "d",
      symbolColor: "dytr",
      cardColor: "dmhmj",
      textColor: "dmbh",
  
      symbolBackgroundColor:"",
    };
    let tempUser3: User = {
      id:3,
      firstName: "lhbl",
      lastName: "lubu",
      title: "lubyu",
      contacts: [1,2],
      contactNum: 2,
      quote: "lugbyb",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "l",
      symbolColor: "lnuhnu",
      cardColor: "lyvt",
      textColor: "lrxr",
  
      symbolBackgroundColor:"",
    };

    expect(userComponent.users.length).toBe(0);
    searchService.usersSearch("afg");

    let req = httpTestingController.expectOne('http://localhost:8080/api/users/search/?searchValue=afg');
    expect(req.request.method).toBe('POST');
    req.flush({message:"", success:true, users:[tempUser1], allUsers: undefined});
    httpTestingController.verify();
    expect(userComponent.users.length).toBe(1);
    expect(userComponent.users[0].lastName).toBe("afga");

    searchService.titlesSearch("af");
    req = httpTestingController.expectOne('http://localhost:8080/api/titles/search/?searchValue=af');
    expect(req.request.method).toBe('POST');
    req.flush({message:"", success:true, titles:[{ title: "afh", users: [tempUser1] }], allTitles: [{ title: "afh", users: [tempUser1] },{ title: "lkj", users: [tempUser2,tempUser3] }]});

    expect(titlesComponent.DisplayTitlesInSearch.length).toBe(1);
    expect(titlesComponent.DisplayTitlesInSearch[0].title).toBe("afh");
    expect(titlesComponent.DisplayTitlesInSearch[0].users.length).toBe(1);
    expect(titlesComponent.DisplayTitlesInSearch[0].users[0].id === titlesComponent.titles[0].users[0].id).toBe(true);
    expect(titlesComponent.titles.length).toBe(2);
    expect(titlesComponent.titles[0].title).toBe("afh");
    expect(titlesComponent.titles[1].title).toBe("lkj");
    expect(titlesComponent.titles[1].users.length).toBe(2);
    expect(titlesComponent.searchPopup).toBe(true);

    //Actually searching an empty string will return an empty array from the backend
    //This is just for testing purposes
    searchService.titlesSearch("");
    req = httpTestingController.expectOne('http://localhost:8080/api/titles/search/?searchValue=');
    expect(req.request.method).toBe('POST');
    req.flush({message:"", success:true, titles:[], allTitles: [{ title: "afh", users: [tempUser1] },{ title: "lkj", users: [tempUser2,tempUser3] }]});

    expect(titlesComponent.DisplayTitlesInSearch.length).toBe(1);
    expect(titlesComponent.DisplayTitlesInSearch[0].title).toBe("");
    expect(titlesComponent.DisplayTitlesInSearch[0].users.length).toBe(0);
    expect(titlesComponent.titles.length).toBe(2);
    expect(titlesComponent.titles[0].title).toBe("afh");
    expect(titlesComponent.titles[1].title).toBe("lkj");
    expect(titlesComponent.titles[1].users.length).toBe(2);
    expect(titlesComponent.searchPopup).toBe(true);

    searchService.titlesSearch("");
    req = httpTestingController.expectOne('http://localhost:8080/api/titles/search/?searchValue=');
    expect(req.request.method).toBe('POST');
    req.flush({message:"", success:true, titles:[], allTitles: []});

    expect(titlesComponent.DisplayTitlesInSearch.length).toBe(1);
    expect(titlesComponent.DisplayTitlesInSearch[0].title).toBe("");
    expect(titlesComponent.DisplayTitlesInSearch[0].users.length).toBe(0);
    expect(titlesComponent.titles.length).toBe(1);
    expect(titlesComponent.titles[0].title).toBe("");
    expect(titlesComponent.titles[0].users.length).toBe(0);
    expect(titlesComponent.searchPopup).toBe(true);

  });
});
