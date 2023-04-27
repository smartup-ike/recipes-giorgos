import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './services/data.service';

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
    this.data.currentTitle.subscribe(title => this.title = title)

  }

  goBack() {
    this._location.back();
  }
}
