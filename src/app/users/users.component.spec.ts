import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { MockLoginService } from '../mock/MockLoginService';
import { MockThemesService } from '../mock/MockSearchService';
import { MockSearchService } from '../mock/MockThemesService';
import { MockUserService } from '../mock/MockUserService';
import { ThemesService } from '../themes/themes.service';
import { LoginService } from '../toolbarAndLogin/login.service';
import { SearchService } from '../toolbarAndLogin/search.service';
import { UserComponent } from './users.component';
import { UserService } from './users.service';

describe('UserComponent', () => {
  let comp:UserComponent;
  let userService:UserService;
  let searchService;
  let loginService;
  let themesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserComponent,
        { provide: UserService, useClass: MockUserService }, { provide: SearchService, useClass: MockSearchService }, { provide: LoginService, useClass: MockLoginService }, { provide: ThemesService, useClass: MockThemesService },
    ]
    })//.compileComponents();
    
    comp = TestBed.inject(UserComponent);
    userService = TestBed.inject(UserService);
    searchService = TestBed.inject(SearchService);
    loginService = TestBed.inject(LoginService);
    themesService = TestBed.inject(ThemesService);
  });

  it('filler', () => {
    
    expect(comp.getUsers.length).toBe(0);
  });

  
});
