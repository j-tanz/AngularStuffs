import { Component, OnInit } from '@angular/core';
import { ItemsService, Item } from '../shared/items.service';

@Component({
  selector: 'app-items-master',
  templateUrl: './items-master.component.html',
  styleUrls: ['./items-master.component.scss']
})
export class ItemsMasterComponent implements OnInit {

  items: Item[] = []

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.items = this.itemsService.getItems();
  }
}
