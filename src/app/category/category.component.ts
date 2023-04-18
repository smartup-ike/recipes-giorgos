import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemSummary } from '../models/item-summary.model';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  itemsArr: ItemSummary[] = [];

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (id) {
        this.api.getOptionKeys(id).subscribe((items) => {
          this.itemsArr = [];

          for (const item in items) {
            this.api.getSummary(item).subscribe((summary) => {
              (summary as ItemSummary).id = item;

              this.itemsArr.push(summary as ItemSummary);
            });
          }
        });
      }
    });
  }
}
