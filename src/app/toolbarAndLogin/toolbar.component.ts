import { ActivatedRoute } from "@angular/router";
import { SearchService } from "./search.service";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  SearchPopup: boolean = false;

  constructor (private route: ActivatedRoute, private searchService: SearchService, private loginService: loginService) {
    
  }
  public getCurrentTab() {
    return this.route.snapshot.url.join('');
  }
  public search( value: string, options: Object ) {
    if (this.getCurrentTab === "Users") {
      this.searchService.userSearch();
    } if (this.getCurrentTab === "Titles") {
      this.searchService.titlesSearch();
    }
  }
  
  LoginPopup()
  LoginEnter( loginData: Object | FormData )
  switchTab( tab: string)

}
