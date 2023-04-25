import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MenuOption } from '../models/menuOption.model';
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
  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit(): void {
    this.api.getMenuOptions().pipe(
      map((category) =>
        category.filter(
          (category: { title: string }) => category.title !== 'test'
        )
      )
    )
      .subscribe((res) => {
        this.menu = res;
      });
  }

  changeIdAndPath(title: string, path: string) {
    this.changeId(title);
    this.changePath(path);
  }

  changeId(title: string) {
    this.data.changeId(title);
  }

  changePath(path: string) {
    this.data.changePath(path);
  }
}
