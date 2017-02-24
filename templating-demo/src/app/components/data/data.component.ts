import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Component({
    selector: 'app-data',
    template: '<app-dynamic-load [componentData]="data"></app-dynamic-load>',
})
export class DataComponent implements OnInit {
    data: any;

    constructor(private route: ActivatedRoute) {
        route.data.subscribe(
            (res: any) => {
                this.data = res.data;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnInit() {}
}
