import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = 'light';

  constructor() {}

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';

    if (this.theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  getCurrentTheme() {
    return this.theme;
  }
}
