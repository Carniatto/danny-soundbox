import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConnectButtonComponent } from './domains/soundbox/ui/connect-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('danny-soundbox');
}
