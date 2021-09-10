SelectTheme( selectedTheme: Theme )
ConfirmTheme()
Internal API (To REST):
GetThemesfromBackend(): Theme[]
GetUserLastLoggedInTheme(): Theme
SetUserLastLoggedInTheme( selectedTheme: Theme ): Theme
Flags (Variable):
LastUserUsedTheme: Theme
SelectedTheme: Theme
CurrentTheme: Theme
ArrayOfThemes: Theme[]

@Component({
  selector: 'themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
  providers: [ThemesService]
})
export class UserComponent implements OnInit{
  public ngOnInit() {
    this.getdsfUsers();
    
  }

  public geafsfvtUsers() {
    this.userservice.getUsers().subscribe( (usersResponse:Array<User>) => {this.users = usersResponse;});
    console.log("Getting Users");
  }
}