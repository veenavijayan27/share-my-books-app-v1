import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeService } from './services/theme.service';
import { authSelector } from './store/selectors/login.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Share My Books';
  isLoggedIn = false;
  switchTheme = new FormControl(false);

  constructor(private _store: Store, private _themeService: ThemeService) {}

  ngOnInit(): void {
    this._store.select(authSelector).subscribe((state) => {
      if (state) {
        this.isLoggedIn = state.isAuthenticated;
      }
    });
  }

  OnChangeTheme(): void {
    this.switchTheme.valueChanges.subscribe((value) => {
      if (value) {
        this._themeService.toggleDark();
      } else {
        this._themeService.toggleLight();
      }
    });
  }

  OnLogout(): void {
    localStorage.removeItem('accessToken');
    window.location.href = '/home';
  }
}
