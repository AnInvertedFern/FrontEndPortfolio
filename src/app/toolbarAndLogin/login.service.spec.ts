import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserTestingModule } from "@angular/platform-browser/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DummyComponent } from "../dummy.component";
import { ThemeComponent } from "../themes/themes.component";
import { TitlesComponent } from "../titles/titles.component";
import { UserComponent } from "../users/users.component";
import { LoginService } from "./login.service";
import { ToolbarComponent } from "./toolbar.component";

describe('LoginService testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let loginService: LoginService;

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
        ToolbarComponent,
        LoginService,

      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);

  });
  it('LoginService Tests', () => {


    loginService.login({userID:1, password: "IsTest"});

    expect(loginService.unCheckedCredentials.userID).toBe(1);
    expect(loginService.unCheckedCredentials.password).toBe("IsTest");

    let req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:false, admin:false, currentUser:null});

    expect(loginService.checkedCredentials).toBe(undefined);
    expect(loginService.unCheckedCredentials).toBe(undefined);
    expect(loginService.currentUser).toBe(undefined);
    expect(loginService.isAdmin).toBe(false);
    expect(loginService.isLoggedin).toBe(false);
    
    let tempUser: any = {
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


    loginService.login({userID:1, password: "IsTest"});
     req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, admin:true, currentUser:tempUser});
    httpTestingController.verify();
    expect(loginService.isLoggedin).toBe(true);
    expect(loginService.isAdmin).toBe(true);
    expect(loginService.currentUser?.firstName).toBe("ASD");

    expect(loginService.checkedCredentials.userID).toBe(1);
    expect(loginService.checkedCredentials.password).toBe("IsTest");

    loginService.logout();

    req = httpTestingController.expectOne('http://localhost:8080/logout/');
    expect(req.request.method).toBe('GET');
    req.flush(["\"Done\""]);
    httpTestingController.verify();

    expect(loginService.checkedCredentials).toBe(undefined);
    expect(loginService.unCheckedCredentials).toBe(undefined);
    expect(loginService.currentUser).toBe(undefined);
    expect(loginService.isAdmin).toBe(false);
    expect(loginService.isLoggedin).toBe(false);








    //Push response boxes are not tested here, see users.component.spec.ts

  });
});
