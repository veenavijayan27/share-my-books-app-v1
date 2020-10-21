import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeService } from './services/theme.service';
import { authSelector } from './store/selectors/login.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'shareMyBooks';
  isLoggedIn: boolean;
  switchTheme = new FormControl(false);

  constructor(private store: Store, private themeService: ThemeService){
  }

  ngOnInit(): void{
    this.store.select(authSelector).subscribe(state => {
      if (state) {
        this.isLoggedIn = state.isAuthenticated;
      }
    });
  }


  changeTheme(): void{
    this.switchTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/home';
  }

}
