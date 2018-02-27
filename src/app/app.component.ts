import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import 'rxjs/add/operator/map';

const PEOPLE_KEY = makeStateKey('people');

interface User {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public people: User[] = [];

  constructor (
    private http: HttpClient,
    private state: TransferState
  ) { }

  ngOnInit() {
    this.people = this.state.get<User[]>(PEOPLE_KEY, null);
    if (!this.people) {
      this.http.get<any>('https://randomuser.me/api/?results=10&seed=foobar')
      .map(data => <User[]>data.results)
      .subscribe(data => {
        console.log('data retrieved from API');
        this.people = data;
        this.state.set<User[]>(PEOPLE_KEY, data);
       });
    }
  }
}
