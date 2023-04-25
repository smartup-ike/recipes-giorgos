import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Subscription } from 'rxjs';
import { ItemSummary } from '../models/item-summary.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  itemsArr: ItemSummary[] = [];
  isLoading = false;

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.isLoading = true;
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
    this.isLoading = false;
  }
}
