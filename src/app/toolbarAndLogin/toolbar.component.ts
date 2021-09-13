import { ActivatedRoute } from "@angular/router";
import { SearchService } from "./search.service";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  searchPopup: boolean = false;
  loginPopup: boolean = false;

  constructor (private route: ActivatedRoute, private searchService: SearchService, private loginService: loginService) {
    
  }
  public getCurrentTab() {
    return this.route.snapshot.url.join('');
  }
  public search( value: string, options: Object ) {
    if (this.getCurrentTab() === "Users") {
      this.searchService.userSearch();
    } if (this.getCurrentTab() === "Titles") {
      this.searchService.titlesSearch();
    }
  }
  
  public loginPopupEvent() {
    this.loginPopup = !this.loginPopup;
  }
  public searchPopupEvent() {
    this.searchPopup = !this.searchPopup;
  }
  login( loginData: Object | FormData ) {
    this.loginService.login(loginData);
  }

}
