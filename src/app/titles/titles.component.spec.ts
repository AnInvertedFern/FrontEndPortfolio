import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DummyComponent } from "../dummy.component";
import { ThemeComponent } from "../themes/themes.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { TitlesComponent } from "./titles.component";

describe('TitlesComponent testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
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
        TitlesComponent,
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    titlesFixture = TestBed.createComponent(TitlesComponent);
    titlesComponent = titlesFixture.componentInstance;
    titlesFixture.detectChanges();
  });
  it('TitlesComponent Tests', () => {
    
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
    let tempUser4: User = {
      id:4,
      firstName: "vfdsgf",
      lastName: "vghdj",
      title: "vsyj",
      contacts: [],
      contactNum: 0,
      quote: "vafgs",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "v",
      symbolColor: "vbvmvm",
      cardColor: "vsfs",
      textColor: "vghj",
  
      symbolBackgroundColor:"",
    };
    let tempUser5: User = {
      id:5,
      firstName: "udfsb",
      lastName: "usdfg",
      title: "usfbf",
      contacts: [],
      contactNum: 0,
      quote: "uhmb",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "u",
      symbolColor: "ugfbf",
      cardColor: "usdfgs",
      textColor: "ufgfngn",
  
      symbolBackgroundColor:"",
    };

    let req = httpTestingController.expectOne("http://localhost:8080/api/titles/all/");
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, titles:undefined, allTitles:[{ title: "afh", users: [tempUser1] },{ title: "lkj", users: [tempUser2,tempUser3] }]});
    expect(titlesComponent.titles.length).toBe(2);
    expect(titlesComponent.titles[0].title).toBe("afh");
    expect(titlesComponent.titles[1].title).toBe("lkj");
    expect(titlesComponent.titles[1].users.length).toBe(2);
    expect(titlesComponent.searchPopup).toBe(false);

    titlesComponent.searchPopup = true;
    titlesComponent.searchPopupEvent();
    expect(titlesComponent.searchPopup).toBe(false);
    titlesComponent.searchPopupEvent();
    expect(titlesComponent.searchPopup).toBe(true);
    
    expect(titlesComponent.getIndexOfTitleByName("afh")).toBe(0);
    expect(titlesComponent.getIndexOfTitleByName("lkj")).toBe(1);

    titlesComponent.setTitleTo(1);
    expect(titlesComponent.currentSelectedTitle).toBe(1);
    expect(titlesComponent.leftTitle).toBe(0);
    expect(titlesComponent.rightTitle).toBe(0);

    titlesComponent.titles = [];
    titlesComponent.setTitleTo(0);
    expect(titlesComponent.titles.length).toBe(1);
    expect(titlesComponent.titles[0].title).toBe("");
    expect(titlesComponent.leftTitle).toBe(0);
    expect(titlesComponent.rightTitle).toBe(0);

    titlesComponent.titles = [{ title: "afh", users: [tempUser1] },{ title: "lkj", users: [tempUser2,tempUser3] },{ title: "wer", users: [tempUser4] },{ title: "vbn", users: [tempUser5] }];
    titlesComponent.setTitleTo(1);
    expect(titlesComponent.currentSelectedTitle).toBe(1);
    expect(titlesComponent.leftTitle).toBe(0);
    expect(titlesComponent.rightTitle).toBe(2);
    titlesComponent.setTitleTo(2);
    expect(titlesComponent.currentSelectedTitle).toBe(2);
    expect(titlesComponent.leftTitle).toBe(1);
    expect(titlesComponent.rightTitle).toBe(3);
    titlesComponent.setTitleTo(3);
    expect(titlesComponent.currentSelectedTitle).toBe(3);
    expect(titlesComponent.leftTitle).toBe(2);
    expect(titlesComponent.rightTitle).toBe(0);
    titlesComponent.setTitleTo(0);
    expect(titlesComponent.currentSelectedTitle).toBe(0);
    expect(titlesComponent.leftTitle).toBe(3);
    expect(titlesComponent.rightTitle).toBe(1);
  });
});
