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
import { ToolbarComponent } from "./toolbar.component";

describe('ToolbarComponent testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let toolbarComponent: ToolbarComponent;
  let toolbarFixture: ComponentFixture<ToolbarComponent>;

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

      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    toolbarFixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = toolbarFixture.componentInstance;
    toolbarFixture.detectChanges();
  });
  it('ToolbarComponent Tests', () => {

    toolbarComponent.loginPopupEvent();
    expect(toolbarComponent.loginPopup).toBe(true);
    toolbarComponent.popupLoginObject.userID ="1";
    toolbarComponent.popupLoginObject.password = "fruit";
    toolbarComponent.loginPopupCancel();
    expect(toolbarComponent.loginPopup).toBe(false);
    expect(toolbarComponent.popupLoginObject.userID).toBe("");
    expect(toolbarComponent.popupLoginObject.password).toBe("");

    toolbarComponent.loginPopupEvent();
    toolbarComponent.popupLoginObject.userID = "1";
    toolbarComponent.popupLoginObject.password = "fruit";
    expect(toolbarComponent.popupLoginObject.userID).toBe("1");
    expect(toolbarComponent.popupLoginObject.password).toBe("fruit");
    toolbarComponent.resetPopupLogin();
    expect(toolbarComponent.popupLoginObject.userID).toBe("");
    expect(toolbarComponent.popupLoginObject.password).toBe("");
    expect(toolbarComponent.loginPopup).toBe(true);
    
    toolbarComponent.popupLoginObject.userID = "1";
    toolbarComponent.popupLoginObject.password = "fruit";
    toolbarComponent.login();
    expect(toolbarComponent.loginPopup).toBe(false);
    expect(toolbarComponent.popupLoginObject.userID).toBe("");
    expect(toolbarComponent.popupLoginObject.password).toBe("");
    
    expect(toolbarComponent.loginService.unCheckedCredentials?.userID).toBe("1");
    expect(toolbarComponent.loginService.unCheckedCredentials?.password).toBe("fruit");

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

    let req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, admin:true, currentUser:tempUser});
    httpTestingController.verify();
    expect(toolbarComponent.loginService.isLoggedin).toBe(true);
    expect(toolbarComponent.loginService.isAdmin).toBe(true);
    expect(toolbarComponent.loginService.currentUser?.firstName).toBe("ASD");

    expect(toolbarComponent.loginService.checkedCredentials?.userID).toBe("1");
    expect(toolbarComponent.loginService.checkedCredentials?.password).toBe("fruit");

    toolbarComponent.logout();

    req = httpTestingController.expectOne('http://localhost:8080/logout/');
    expect(req.request.method).toBe('GET');
    req.flush(["\"Done\""]);
    httpTestingController.verify();

    expect(toolbarComponent.loginService.checkedCredentials).toBe(undefined);
    expect(toolbarComponent.loginService.unCheckedCredentials).toBe(undefined);
    expect(toolbarComponent.loginService.currentUser).toBe(undefined);
    expect(toolbarComponent.loginService.isAdmin).toBe(false);
    expect(toolbarComponent.loginService.isLoggedin).toBe(false);

    expect(toolbarComponent.responseBoxSuccessPopup).toBe(false);
    toolbarComponent.responseBoxSuccessPopup = true;
    toolbarComponent.responseBoxCancel();
    expect(toolbarComponent.responseBoxSuccessPopup).toBe(false);

    //Router does not work in testing, so cannot test search logic in toolbar component
    //It is tested in login service 

  });
});
