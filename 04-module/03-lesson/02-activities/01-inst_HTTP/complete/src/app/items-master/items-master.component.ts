import { Component, OnInit } from '@angular/core';
import { ItemsService, Item } from '../shared/items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items-master',
  templateUrl: './items-master.component.html',
  styleUrls: ['./items-master.component.scss']
})
export class ItemsMasterComponent implements OnInit {

  items: Item[] = []

  itemsSub: Subscription;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.getItemsFromServer();
  }

  getItemsFromServer() {
    this.itemsSub = this.itemsService.getItemsFromServer()
      .subscribe(
        (res: Item[]) => {
          console.log('items res', res);
          this.items = res;
        },
        err => { console.error(err); },
        () => { }
      );
  }
}
