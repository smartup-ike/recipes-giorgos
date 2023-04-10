import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Category from '../models/category.model';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  menu: Category[] = [];
  constructor(public api: ApiService, private data: DataService) {}

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.api
      .getMenu()
      .pipe(
        map((category) =>
          category.categories.filter((category) => category.title !== 'test')
        )
      )
      .subscribe((categories) => {
        this.menu = categories;
      });
  }

  changeID(title: string) {
    this.data.changeID(title);
  }
}
