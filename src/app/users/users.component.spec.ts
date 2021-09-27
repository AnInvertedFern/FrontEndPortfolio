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

describe('UserComponent testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let comp:UserComponent;
  let userComponent: UserComponent;
  let userFixture: ComponentFixture<UserComponent>;
  let toolbarComponent: ToolbarComponent;
  let toolbarFixture: ComponentFixture<ToolbarComponent>;

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
        UserComponent,
        ToolbarComponent,

      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // comp = TestBed.inject(UserComponent);

    userFixture = TestBed.createComponent(UserComponent);
    userComponent = userFixture.componentInstance;
    userFixture.detectChanges();
    toolbarFixture = TestBed.createComponent(ToolbarComponent);
    toolbarComponent = toolbarFixture.componentInstance;
    toolbarFixture.detectChanges();
  });
  it('can test HttpClient.get', () => {
    // const userElement: HTMLElement = fixture.nativeElement;
    // const userElement: DebugElement = fixture.debugElement;
    // console.log(userElement.querySelector(".users"));
    // console.log(userElement.query(By.css(".users")));

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
    let tempUser2: any = {
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
    // component.getUsers();

    httpTestingController.expectOne("http://localhost:8080/api/themes/all/");

    let req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempUser, tempUser2]});
    // const req2 = httpTestingController.expectOne('http://localhost:8080/api/users/all');
    // expect(req2.request.method).toBe('GET');
    // req2.flush(tempUser);

    // httpTestingController.verify();
    
    // console.log(userElement.querySelector(".refresh-users-button-text"));
    // console.log(userElement.query(By.css(".user-bio")))
    // expect(userElement.querySelector(".user-bio")).not.toBeNull();
    console.log(userComponent.users);
    expect(userComponent.users).not.toBeNull();
    expect(userComponent.users.length).toBe(2);
    expect(userComponent.users[0].firstName).toBe("ASD");
    expect(userComponent.users[0].symbolColor).toBe("avbbv");
    expect(userComponent.users[1].lastName).toBe("dhjdh");
    expect(userComponent.users[1].quote).toBe("dfhj");
    // expect(userElement.querySelector(".refresh-users-button-text")?.textContent).not.toBeNull();


    
    // console.log(userElement.querySelector("#user-form-first-name"));
    userComponent.toggleEditUserPopup(userComponent.users[0]);
    // console.log(userElement.querySelector("#user-form-first-name"));
    // expect(userElement.querySelector("#user-form-first-name")).not.toBeNull();
    // expect(( <HTMLInputElement> userElement.querySelector("#user-form-first-name"))?.value).not.toBe("");
    console.log(userComponent.popupUserObject);
    expect(userComponent.popupUserObject.firstName).toBe("ASD");
    expect(userComponent.popupUserObject.lastName).toBe("afga");
    expect(userComponent.popupUserObject.quote).toBe("aghsgf");
    expect(userComponent.popupUserObject.symbolColor).toBe("avbbv");
    expect(userComponent.popupUserObject.sourceUser).not.toBeNull();
    
    userComponent.updateUsers(userComponent.popupUserObject);
    httpTestingController.verify();

    toolbarComponent.popupLoginObject.userID = 1;
    toolbarComponent.popupLoginObject.password = "qwerty";
    toolbarComponent.login();

    req = httpTestingController.expectOne('http://localhost:8080/login/get_role/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, admin:false, currentUser:tempUser});
    httpTestingController.verify();
    expect(toolbarComponent.loginService.isLoggedin).toBe(true);
    
    userComponent.toggleEditUserPopup(userComponent.users[1]);
    userComponent.updateUsers(userComponent.popupUserObject);
    httpTestingController.verify();
    
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


    userComponent.toggleEditUserPopup(userComponent.users[1]);
    expect(userComponent.popupUserObject.rated).toBe(false);
    userComponent.popupUserObject.rated = true;
    expect(userComponent.popupUserObject.rated).toBe(true);
    userComponent.updateUsers(userComponent.popupUserObject);
    req = httpTestingController.expectOne('http://localhost:8080/api/users/addcontact/');
    expect(req.request.method).toBe('POST');
    console.log(Object.keys(req.request.body));
    expect(Object.keys(req.request.body).length).toBe(2);
    console.log(req.request.body.primaryUser);
    tempTempUser = req.request.body.primaryUser;
    expect(tempTempUser.contactNum).toBe(0);
    tempTempUser.contactNum +=1;
    tempTempUser.contacts.push(1);
    req.flush({message:"", success:true, users:[tempTempUser], allUsers: undefined});
    
    req = httpTestingController.expectOne('http://localhost:8080/api/users/all/');
    expect(req.request.method).toBe('GET');
    req.flush({message:"", success:true, users:undefined, allUsers:[tempUser, tempTempUser]});
    console.log(userComponent.users[0]);
    console.log(userComponent.users[1]);
    expect(userComponent.users[0].contacts[0] === userComponent.users[1].id).toBe(true);
    expect(userComponent.users[0].contacts.length === userComponent.users[0].contactNum).toBe(true);

    expect(userComponent.EditUserPopup).toBe(false);
    httpTestingController.verify();

    
    userComponent.deleteUser(userComponent.users[0].id);
    req = httpTestingController.expectOne(`http://localhost:8080/api/users/${userComponent.users[0].id}`);
    expect(req.request.method).toBe('DELETE');
    console.log(req.request.url.split("/").pop());
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

// import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from '../app.component';
// import { MockLoginService } from '../mock/MockLoginService';
// import { MockThemesService } from '../mock/MockSearchService';
// import { MockSearchService } from '../mock/MockThemesService';
// import { MockUserService } from '../mock/MockUserService';
// import { ThemesService } from '../themes/themes.service';
// import { LoginService } from '../toolbarAndLogin/login.service';
// import { SearchService } from '../toolbarAndLogin/search.service';
// import { UserComponent } from './users.component';
// import { UserService } from './users.service';
// import { AppRoutingModule } from '../app-routing.module';
// import { defer } from 'rxjs/internal/observable/defer';
// import { Injectable } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';

// // @Injectable({providedIn:'root'})
// // class HttpClientSpy {
// //   // spy=jasmine.createSpyObj('HttpClient', ['get']);
// //   get:any = {and: {returnValue:Function}};
  
// // }

// describe('UserComponent', () => {
//   let comp:UserComponent;
//   let userService:UserService;
//   let searchService;
//   let loginService;
//   let themesService;
//   // let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;

//   let httpClientSpy: jasmine.SpyObj<HttpClient>;
//   let component: UserComponent;
//   let fixture: ComponentFixture<UserComponent>;

//   beforeEach(async () => {
//      const spy = jasmine.createSpyObj('HttpClient', ['get']);

//     await TestBed.configureTestingModule({
//       imports: [ //HttpClientTestingModule, 
//         AppRoutingModule,
//         // HttpClientModule, 
//         FormsModule,
//         BrowserModule,
//       ],
//       providers: [
//         UserComponent,
//         { provide: HttpClient, value: spy }, 
//         // {provide: HttpHandler, useClass: HttpHandler },
//         // { provide: UserService, useClass: MockUserService }, { provide: SearchService, useClass: MockSearchService }, { provide: LoginService, useClass: MockLoginService }, { provide: ThemesService, useClass: MockThemesService },
//     ]
//     }).compileComponents(); 
    
//     // comp = TestBed.inject(UserComponent);
//     // userService = TestBed.inject(UserService);
//     // searchService = TestBed.inject(SearchService);
//     // loginService = TestBed.inject(LoginService);
//     // themesService = TestBed.inject(ThemesService);
//     // httpClient = TestBed.inject(HttpClient);
//     // httpClient = TestBed.inject( jasmine.createSpyObj('HttpClient', ['get']));
//     httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
//     // httpTestingController = TestBed.inject(HttpTestingController);

    
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     // httpClientSpy = TestBed.inject(HttpClientSpy);

//   });


//   function asyncData<T>(data: T) {
//     return defer(() => Promise.resolve(data));
//   }
  
//   it('filler', () => {
      
//     const userElement: HTMLElement = fixture.nativeElement;
//     console.log(userElement.querySelector(".users"));
//     // expect().toContain('banner works!');

//     let tempUser: any = {
//       id:-1,
//       firstName: "",
//       lastName: "",
//       title: "",
//       contacts: [],
//       contactNum: -1,
//       quote: "",
//       secret: "",
//       lastTheme: -1,
//       symbol: "",
//       symbolColor: "",
//       cardColor: "",
//       textColor: "",
  
//       symbolBackgroundColor:"",
//     };
//     component.getUsers();
    
//     httpClientSpy.get.and.returnValue(asyncData([tempUser]));


//     console.log(userElement.querySelector(".user-bio"));
//     // expect(userElement.querySelector(".user-bio")).not.toBeNull();

//   });

  
// });
