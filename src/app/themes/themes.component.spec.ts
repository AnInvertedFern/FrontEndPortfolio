import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DummyComponent } from "../dummy.component";
import { TitlesComponent } from "../titles/titles.component";
import { ToolbarComponent } from "../toolbarAndLogin/toolbar.component";
import { User } from "../users/user";
import { UserComponent } from "../users/users.component";
import { Theme } from "./theme";
import { ThemeComponent } from "./themes.component";
import { ThemesService } from "./themes.service";

describe('ThemesComponent testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let themesComponent: ThemeComponent;
  let themesFixture: ComponentFixture<ThemeComponent>;
  let toolbarComponent: ToolbarComponent;
  let toolbarFixture: ComponentFixture<ToolbarComponent>;
  let themesService: ThemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'users-component', component: UserComponent },
            { path: 'titles-component', component: TitlesComponent },
            { path: 'themes-component', component: ThemeComponent },
            { path: 'dummy-component', component: DummyComponent },
            { path: '',   redirectTo: 'users-component', pathMatch: 'full' },
          ]
        ),
        BrowserTestingModule,
      ], 
      providers: [
        ThemeComponent,
        ToolbarComponent,
        ThemesService,
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    themesService = TestBed.inject(ThemesService);

    themesFixture = TestBed.createComponent(ThemeComponent);
    themesComponent = themesFixture.componentInstance;
    themesFixture.detectChanges();
    toolbarFixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = toolbarFixture.componentInstance;
    toolbarFixture.detectChanges();

  });
  it('ThemesComponent Tests', () => {

    let tempTheme1:Theme = {
      id: 1,
      inactiveTabColor: "red",
      activeTabColor: "orange",
      toolbarColor: "green",
      searchBarColor: "blue",
      loginButtonColor: "gold",
      backgroundColor: "yellow",
      textColor: "purple",
      addUserColor: "magenta",
      editUserColor: "cyan",
      confirmThemeColor: "teal",
    
      refreshUserColor: "grey",
      popupColor: "maroon",
      titleShadowColor: "navy",
      searchTitleShadowColor: "orange",
      footerSeperatorColor: "purple",
      loginShadowColor: "red",
      inputColor: "white",
      inputButtonColor: "yellow",
    };
    let tempTheme2:Theme = {
      id: 2,
      inactiveTabColor: "brown",
      activeTabColor: "black",
      toolbarColor: "white",
      searchBarColor: "silver",
      loginButtonColor: "navy",
      backgroundColor: "grey",
      textColor: "orange",
      addUserColor: "green",
      editUserColor: "yellow",
      confirmThemeColor: "purple",
    
      refreshUserColor: "cyan",
      popupColor: "green",
      titleShadowColor: "brown",
      searchTitleShadowColor: "red",
      footerSeperatorColor: "blue",
      loginShadowColor: "gold",
      inputColor: "green",
      inputButtonColor: "purple",
    };
    let reqArray = httpTestingController.match("http://localhost:8080/api/themes/all/");
    expect(reqArray.length === 2);
    let req = reqArray[0];
    expect(req.request.method).toBe('GET');
    req.flush([tempTheme1, tempTheme2]);

    themesComponent.themes = [tempTheme1, tempTheme2];
    themesComponent.selectTheme(1);
    expect(themesComponent.selectedTheme).toBe(1);
    expect(themesComponent.selectedThemeCopy.toolbarColor).toBe("white");
    expect(themesComponent.selectedThemeCopy.textColor).toBe("orange");
    expect(themesComponent.selectedThemeCopy.confirmThemeColor).toBe("purple");

    themesService.themes = [tempTheme1, tempTheme2];
    themesComponent.confirmTheme();
    expect(themesService.currentTheme).toBe(themesComponent.selectedTheme);
    expect(themesComponent.selectedThemeCopy.toolbarColor).toBe("white");
    expect(themesComponent.selectedThemeCopy.textColor).toBe("orange");
    expect(themesComponent.selectedThemeCopy.confirmThemeColor).toBe("purple");
    
    let tempUser: User = {
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
    toolbarComponent.popupLoginObject.userID = "1";
    toolbarComponent.popupLoginObject.password = "qwerty";
    toolbarComponent.login();

    req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, admin:true, currentUser:tempUser});
    httpTestingController.verify();
    expect(toolbarComponent.loginService.isLoggedin).toBe(true);

    
    themesComponent.confirmTheme();
    req = httpTestingController.expectOne('http://localhost:8080/api/users/');
    expect(req.request.method).toBe('POST');
    req.flush({message:"", success:true, users:[req.request.body], allUsers: undefined});

    themesComponent.selectTheme(0);
    themesComponent.selectedThemeCopy.activeTabColor = "lightsalmon"
    themesComponent.updateTheme();
    req = httpTestingController.expectOne('http://localhost:8080/api/themes/');
    expect(req.request.method).toBe('POST');
    let tempUpdatedTheme = req.request.body;
    req.flush(tempUpdatedTheme);
    req = httpTestingController.expectOne("http://localhost:8080/api/themes/all/");
    expect(req.request.method).toBe('GET');
    req.flush([tempUpdatedTheme, tempTheme2]);

    expect(themesComponent.themes[0].activeTabColor).toBe("lightsalmon");

  });
});
