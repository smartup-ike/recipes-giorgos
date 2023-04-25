import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  title = '';


  ngOnInit(): void {
    this.data.currentId.subscribe(id => this.title = id)

  }

  goBack() {
    this._location.back();
  }
}
