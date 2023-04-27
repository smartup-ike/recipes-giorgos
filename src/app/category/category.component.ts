import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Observable, Subscription, combineLatest, map, of, switchMap } from 'rxjs';
import { ItemSummary } from '../models/item-summary.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  itemsArr?: ItemSummary[];

  subscription: Subscription = new Subscription();

  ngOnInit(): void {

    const paramMap$ = this.route.paramMap;

    paramMap$.pipe(switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return of(null);
      }
      return this.api.getOptionKeys(id);
    }), switchMap(optionKeys => {
      const itemsArr$: Observable<ItemSummary | null>[] = [];
      for (const optionKey in optionKeys) {
        const summary$ = this.api.getSummary(optionKey).pipe(map(summary => {
          return summary ? {
            ...summary,
            id: optionKey
          } : null;

        }));
        itemsArr$.push(summary$);
      }
      return combineLatest(itemsArr$);
    })).subscribe(itemsArr => {
      this.itemsArr = itemsArr.filter(item => item) as ItemSummary[]
    });


    // const getOptionKeys$ =
    //   combineLatest([this.route.paramMap, this.api]).pipe()



    // this.route.paramMap.subscribe((params) => {
    //   let id = params.get('id');

    //   if (id) {
    //     this.api.getOptionKeys(id).subscribe((items) => {
    //       this.itemsArr = [];

    //       for (const item in items) {
    //         this.api.getSummary(item).subscribe((summary) => {
    //           (summary as ItemSummary).id = item;

    //           this.itemsArr?.push(summary as ItemSummary);
    //         });
    //       }
    //     });
    //   }
    // });
  }
}
