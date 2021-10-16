import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserComponent } from './users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TitlesComponent } from '../titles/titles.component';
import { ThemeComponent } from '../themes/themes.component';
import { ToolbarComponent } from '../toolbarAndLogin/toolbar.component';
import { DummyComponent } from '../dummy.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { User } from './user';

describe('UserComponent testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userComponent: UserComponent;
  let userFixture: ComponentFixture<UserComponent>;
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
        UserComponent,
        ToolbarComponent,
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    userFixture = TestBed.createComponent(UserComponent);
    userComponent = userFixture.componentInstance;
    userFixture.detectChanges();
    toolbarFixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = toolbarFixture.componentInstance;
    toolbarFixture.detectChanges();
  });
  it('UserComponenet Tests', () => {

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
    let tempUser2: User = {
      id:2,
      firstName: "dga",
      lastName: "dhjdh",
      title: "dhjgh",
      contacts: [],
      contactNum: 0,
      quote: "dfhj",
      secret: "***Secret***",
      lastTheme: 0,
      symbol: "i",
      symbolColor: "dhgj",
      cardColor: "dyjd",
      textColor: "djhf",
  
      symbolBackgroundColor:"",
    };

    httpTestingController.expectOne("http://localhost:8080/api/themes/all/");

    let req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempUser, tempUser2]});
    expect(userComponent.users).not.toBeNull();
    expect(userComponent.users.length).toBe(2);
    expect(userComponent.users[0].firstName).toBe("ASD");
    expect(userComponent.users[0].symbolColor).toBe("avbbv");
    expect(userComponent.users[1].lastName).toBe("dhjdh");
    expect(userComponent.users[1].quote).toBe("dfhj");

    userComponent.toggleEditUserPopup(userComponent.users[0]);
    expect(userComponent.popupUserObject.firstName).toBe("ASD");
    expect(userComponent.popupUserObject.lastName).toBe("afga");
    expect(userComponent.popupUserObject.quote).toBe("aghsgf");
    expect(userComponent.popupUserObject.symbolColor).toBe("avbbv");
    expect(userComponent.popupUserObject.sourceUser).not.toBeNull();
    
    //Attempt to update the user, no request should go through
    //As login information should not be set
    userComponent.updateUsers(userComponent.popupUserObject);
    httpTestingController.verify();

    toolbarComponent.popupLoginObject.userID = "1";
    toolbarComponent.popupLoginObject.password = "qwerty";
    toolbarComponent.login();

    req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, admin:false, currentUser:tempUser});
    httpTestingController.verify();
    expect(toolbarComponent.loginService.isLoggedin).toBe(true);
    
    //Nothing should go through as the you cannot edit a different user unless your an admin
    userComponent.toggleEditUserPopup(userComponent.users[1]);
    userComponent.updateUsers(userComponent.popupUserObject);
    httpTestingController.verify();
    
    //Should go through as it is now editing the logged-in user
    userComponent.toggleEditUserPopup(userComponent.users[0]);
    userComponent.popupUserObject.firstName = "Bob";
    userComponent.updateUsers(userComponent.popupUserObject);

    req = httpTestingController.expectOne('http://localhost:8080/api/users/');
    expect(req.request.method).toBe('POST');
    let tempTempUser = req.request.body;
    req.flush({message:"", success:true, users:[tempUser], allUsers: undefined});
    req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempTempUser, tempUser2]});
    httpTestingController.verify();
    expect(userComponent.users[0].firstName).toBe("Bob");

    //The edited user is different than the login user, but the option to add as a contact is set to true
    userComponent.toggleEditUserPopup(userComponent.users[1]);
    expect(userComponent.popupUserObject.rated).toBe(false);
    userComponent.popupUserObject.rated = true;
    expect(userComponent.popupUserObject.rated).toBe(true);
    userComponent.updateUsers(userComponent.popupUserObject);
    req = httpTestingController.expectOne('http://localhost:8080/api/users/addcontact/');
    expect(req.request.method).toBe('POST');
    expect(Object.keys(req.request.body).length).toBe(2);
    tempTempUser = req.request.body.primaryUser;
    expect(tempTempUser.contactNum).toBe(0);
    tempTempUser.contactNum +=1;
    tempTempUser.contacts.push(1);
    req.flush({message:"", success:true, users:[tempTempUser], allUsers: undefined});
    
    req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempUser, tempTempUser]});
    expect(userComponent.users[0].contacts[0] === userComponent.users[1].id).toBe(true);
    expect(userComponent.users[0].contacts.length === userComponent.users[0].contactNum).toBe(true);

    expect(userComponent.EditUserPopup).toBe(false);
    httpTestingController.verify();

    userComponent.deleteUser(userComponent.users[0].id);
    req = httpTestingController.expectOne(`http://localhost:8080/api/users/${userComponent.users[0].id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({message:req.request.url.split("/").pop(), success:true, users:undefined, allUsers:undefined});
    req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempTempUser]});
    expect(userComponent.users.length).toBe(1);
    httpTestingController.verify();
    expect(toolbarComponent.responseBoxSuccess).toBe("Deleted User: 1");
    expect(toolbarComponent.responseBoxSuccessPopup).toBe(true);
    
    userComponent.toggleNewUserPopup();
    expect(userComponent.EditUserPopup).toBe(false);
    expect(userComponent.NewUserPopup).toBe(true);
    expect(userComponent.popupUserObject.quote).toBe("");
    expect(userComponent.popupUserObject.lastName).toBe("");
    expect(userComponent.popupUserObject.textColor).toBe("");
    expect(userComponent.popupUserObject.password).toBe("");
    userComponent.popupUserObject = {
      firstName: "qewrty",
      lastName: "asdfgh",
      title: "Bobber",
      contactNum: 0,
      rated: false,
      quote: "yuio",
      secret: "hjkl",
      symbol: "V",
      symbolColor: "gold",
      cardColor: "blue",
      textColor: "green",
      symbolBackgroundColor: "black",
      password:"IsTest",
      sourceUser:undefined,
    }
    userComponent.addUser(userComponent.popupUserObject);
    expect(userComponent.popupUserObject.quote).toBe("");
    expect(userComponent.popupUserObject.lastName).toBe("");
    expect(userComponent.popupUserObject.textColor).toBe("");
    expect(userComponent.popupUserObject.password).toBe("");

    req = httpTestingController.expectOne(`http://localhost:8080/api/users/`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.message).toBe("IsTest");
    expect(req.request.body.primaryUser.secret).toBe("hjkl");
    let tempAddedUser = {id: 3, 
      firstName: "qewrty",
      lastName: "asdfgh",
      title: "Bobber",
      contacts: [],
      contactNum: 0,
      quote: "yuio",
      secret: "hjkl",
      symbol: "V",
      symbolColor: "gold",
      cardColor: "blue",
      textColor: "green",
      symbolBackgroundColor: "black",};
    req.flush({message: "", success:false, users:[tempAddedUser], allUsers:undefined});
    expect(toolbarComponent.responseBoxSuccess).not.toBe("Added User: 3");
    req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempTempUser, tempAddedUser]});
    httpTestingController.verify();

  });
});
