import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

export class Customer {
    constructor(item: any) {
        this.id = item.id;
        this.firstName = item.firstName;
        this.lastName = item.lastName;
    }
    id: number;
    firstName: string;
    lastName: string;
    name: string;
}

@Component({
    selector: 'app-customers',
    template: `
    <h2>Customer Request</h2>
    <button type="button" (click)="makeRequest(customerId.value)">Make Request</button>
    <label for="customerId">Customer Id: 
      <input type="text" id="customerId" #customerId>
    </label>
    
    <div *ngIf="loading">loading...</div>
    <pre>{{data | json}}</pre>
    `
})
export class CustomersComponent implements OnInit {
    constructor(private http: Http) { }

    data:any;

    ngOnInit() { }

    public makeRequest(value: number): void {
        console.log(`entered value ${value}`);
        let apiUrl: string = 'https://localhost:44321/api/v1.0/customers'
        let queryUrl: string = `${apiUrl}/${value}`;
        this.http.get(queryUrl)
            .map((response: Response) => {
                var item = <any>response.json();
                return new Customer(item);
            }).subscribe(result => {
                console.log(`found customer ${result.lastName}`)
                this.data = result;
            });
    }
}
