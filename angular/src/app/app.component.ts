import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  public title = 'Welcome to app!!';

  public ngOnInit(): void {
    console.log('Application initialized');
  }

}
