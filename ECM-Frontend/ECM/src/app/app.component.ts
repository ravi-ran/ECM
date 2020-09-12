import { Component } from '@angular/core';
import { WelcomeScreenComponent } from './pages/welcome-screen/welcome-screen.component';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECM';
  public spinkit = Spinkit;
}
