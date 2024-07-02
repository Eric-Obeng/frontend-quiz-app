import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuitzInterfaceComponent } from './quitz-interface/quitz-interface.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuitzInterfaceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-quiz-app';
}
