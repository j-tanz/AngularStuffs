import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item, ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
  ) { }


  ngOnInit() {
    console.log('route', this.route);
    this.paramSub = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        console.log('paramMap itemIndex', paramMap.get('itemIndex'));
        const itemIndex = +paramMap.get('itemIndex');
        this.getItemFromServer(itemIndex);
      })
  }

  getItemFromServer(itemId: number) {
    this.itemsService.getItemByIdFromServer(itemId)
      .subscribe(
        (res: Item) => {
          console.log('res', res);

          this.item = res;
        },
        err => { console.error(err); },
        () => { }
      );
  }

}
