import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Item, ItemsService } from '../shared/items.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  item: Item;
  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService,
    private location: Location
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

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

  onRouterNavigateBack() {
    this.router.navigate(["../"])
  }

  onLocationBack() {
    this.location.back()
  }

}
