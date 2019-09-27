import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService, Item } from '../shared/items.service';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-items-master',
  templateUrl: './items-master.component.html',
  styleUrls: ['./items-master.component.scss']
})
export class ItemsMasterComponent implements OnInit, OnDestroy {

  items: Item[] = []
  filterText = "";

  itemsSub: Subscription;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.getItemsFromServer();
  }

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
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
