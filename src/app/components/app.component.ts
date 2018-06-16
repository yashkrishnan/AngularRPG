import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular RPG';

  fakeBoolean: boolean = true;

  arrayOfThings: string[] = [
    "String 1",
    "String 2",
    "String 3"
  ];

  onClick(sentence: string) {
    console.log(`You clicked this : ${sentence}`);
  }
}
