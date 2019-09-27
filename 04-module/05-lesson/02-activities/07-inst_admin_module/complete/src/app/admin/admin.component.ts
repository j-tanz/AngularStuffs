import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemsService, Item } from '../shared/items.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  addItemForm = this.fb.group({
    name: [''],
    description: [''],
    price: [0],
    imageUrl: ['']
  })

  items: Item[] = [];
  itemsSub: Subscription;
  createItemsSub: Subscription;

  editingItemId: number;

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getItemsFromServer();
  }

  ngOnDestroy() {
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
  }

  onSimulateAPIError() {
    // normally we wouldn't use HTTP in a component, but this is just to demonstrate an API error that we can reliably test with an error code
    this.http.get("https://httpstat.us/500")
      .pipe(first())
      .subscribe(
        (res: any) => {

        },
        err => { console.error(err); },
        () => { }
      );
  }

  onDeleteItem(i: number) {
    this.itemsService.deleteItemByIdFromServer(i)
      .subscribe(
        (res: any) => {
          console.log('delete res', res);
          this.getItemsFromServer();
        },
        err => { console.error(err); },
        () => { }
      );

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

  onStartEditItem(item: Item) {
    this.editingItemId = item.id;
    this.addItemForm.patchValue(item);
  }

  onCancelEditItem() {
    delete this.editingItemId;
    this.addItemForm.reset();
  }

  onSubmitForm() {

    // PUT to edit item
    if (this.editingItemId !== undefined) {

      const name = this.addItemForm.value.name;
      const description = this.addItemForm.value.description;
      const price = this.addItemForm.value.price;
      const imageUrl = this.addItemForm.value.imageUrl;

      this.itemsService.updateItemOnServer(this.editingItemId, name, description, price, imageUrl)
        .pipe(
          first()
        )
        .subscribe(
          (res: Item) => {
            console.log('created item res', res);
            delete this.editingItemId;
            this.addItemForm.reset();

            this.getItemsFromServer();
          },
          err => { console.error(err); },
          () => { }
        );

    } else {
      // create a new item
      const name = this.addItemForm.value.name;
      const description = this.addItemForm.value.description;
      const price = this.addItemForm.value.price;
      const imageUrl = this.addItemForm.value.imageUrl;

      this.itemsService.createNewItemOnServer(name, description, price, imageUrl)
        .pipe(
          first()
        )
        .subscribe(
          (res: Item) => {
            console.log('created item res', res);

            this.addItemForm.reset();

            this.getItemsFromServer();
          },
          err => { console.error(err); },
          () => { }
        );


    }


  }

}
