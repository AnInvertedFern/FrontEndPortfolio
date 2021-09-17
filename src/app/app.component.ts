import { Component, OnInit } from '@angular/core';
import { ThemesService } from './themes/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEndPortfolio';

  constructor (private themeService: ThemesService){
    
  }
  public ngOnInit() {
    this.themeService.loadTheme();
  }
}
