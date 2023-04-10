import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Item, Items } from '../models/item.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  items: Item[] = [];

  title = 'Επιλεξε μενου';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.api.getCategory(params.get('id')!).subscribe((items) => {
        this.items = items.items;
      });
    });
  }
}
