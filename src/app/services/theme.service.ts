import { Injectable } from '@angular/core';

export const darkTheme = {
  'header-color': '#425252',
  'background-color': '#57595d',
  'text-color': 'white'
};

// Light theme properties
export const lightTheme = {
  'header-color': '#a3ced6',
  'background-color': 'white',
  'text-color': '#2c2d2f'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  // Set dark theme
  toggleDark(): void {
    this.setTheme(darkTheme);
  }

  // Set light theme
  toggleLight(): void {
    this.setTheme(lightTheme);
  }

  // Set properties of root variables
  private setTheme(theme: {}): void {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }

}
