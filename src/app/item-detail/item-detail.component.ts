import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ItemDetail } from '../models/item-detail.model';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private data: DataService
  ) {}

  subscription: Subscription = new Subscription();

  item: ItemDetail = {
    id: '',
    title: '',
    imageUrl: '',
    description: undefined,
    ingredients: [],
    instructions: [],
    websiteUrl: '',
    youtubeUrl: '',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.api.getItem(params.get('id')!).subscribe((item) => {
        this.item = item;

        this.data.changeID(item.title);
      });
    });
  }
}
