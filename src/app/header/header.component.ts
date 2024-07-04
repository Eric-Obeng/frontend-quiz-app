import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  toggleActive = false;
  themeService = inject(ThemeService);

  handleClick() {
    // toggle the button
    this.toggleActive = !this.toggleActive;

    // toggele the theme
    this.themeService.toggleTheme();
  }
}
