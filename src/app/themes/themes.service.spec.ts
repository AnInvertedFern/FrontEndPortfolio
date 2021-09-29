import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DummyComponent } from "../dummy.component";
import { TitlesComponent } from "../titles/titles.component";
import { ToolbarComponent } from "../toolbarAndLogin/toolbar.component";
import { UserComponent } from "../users/users.component";
import { Theme } from "./theme";
import { ThemeComponent } from "./themes.component";
import { ThemesService } from "./themes.service";

describe('ThemesService testing', () => {
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
  it('ThemesService Tests', () => {

    let tempTheme1:Theme = {
      id: 1,
      inactiveTabColor: "red",
      activeTabColor: "orange",
      toolbarColor: "green",
      searchBarColor: "blue",
      logoutButtonColor: "gold",
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
      logoutButtonColor: "navy",
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

    expect(themesService.themes[0].activeTabColor).toBe("orange");
    expect(themesService.themes[1].activeTabColor).toBe("black");

    let tempThemeUpdate:Theme = {
      id: 2,
      inactiveTabColor: "brown",
      activeTabColor: "lightsalmon",
      toolbarColor: "white",
      searchBarColor: "silver",
      logoutButtonColor: "navy",
      backgroundColor: "grey",
      textColor: "orange",
      addUserColor: "green",
      editUserColor: "yellow",
      confirmThemeColor: "purple",
    
      refreshUserColor: "silver",
      popupColor: "black",
      titleShadowColor: "white",
      searchTitleShadowColor: "orange",
      footerSeperatorColor: "green",
      loginShadowColor: "yellow",
      inputColor: "black",
      inputButtonColor: "green",
    };
    themesService.updateTheme(tempThemeUpdate).subscribe();
    req = httpTestingController.expectOne('http://localhost:8080/api/themes/');
    expect(req.request.method).toBe('POST');
    let tempUpdatedTheme = req.request.body;
    req.flush(tempUpdatedTheme);
    expect(themesComponent.themes[1].activeTabColor).toBe("black");
    themesService.GetThemesfromBackend();
    req = httpTestingController.expectOne("http://localhost:8080/api/themes/all/");
    expect(req.request.method).toBe('GET');
    req.flush([tempTheme1, tempUpdatedTheme]);

    expect(themesService.themes[1].activeTabColor).toBe("lightsalmon");

    themesService.themesChanged();
    expect(themesComponent.themes[1].activeTabColor).toBe("lightsalmon");
  });
});
