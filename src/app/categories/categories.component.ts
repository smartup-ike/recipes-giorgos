import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import MenuOption from '../models/menuOption.model';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  menu: MenuOption[] = [];
  constructor(public api: ApiService, private data: DataService) {}

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.api.getMenu().subscribe((res) => {
      this.menu = res;
    });
  }

  changeID(title: string) {
    this.data.changeID(title);
  }
}
