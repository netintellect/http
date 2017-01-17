/*
 * Angular
 */
import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'simple-http',
  template: `
  <h2>Basic Request</h2>
  <button type="button" (click)="makeRequest()">Make Request</button>
  <div *ngIf="loading">loading...</div>
  <pre>{{data | json}}</pre>
`
})
export class SimpleHTTPComponent {
  data: Object;
  loading: boolean;

  constructor(private http: Http) {
  }

  makeRequest(): void {
    this.loading = true;
    this.http.request('https://localhost:44321/api/v1.0/customers/1')
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }
}

