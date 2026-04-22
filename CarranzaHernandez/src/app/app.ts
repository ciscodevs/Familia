import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Title } from './components/title/title';
import { AuthGoogle } from './services/auth-google';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Title ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private _authGoogle: AuthGoogle) {}
  protected readonly title = signal('CarranzaHernandez');
}
