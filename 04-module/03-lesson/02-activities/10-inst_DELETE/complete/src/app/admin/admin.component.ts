import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemsService, Item } from '../shared/items.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  addItemForm = this.fb.group({
    name: [''],
    description: [''],
    price: [0],
    imageUrl: ['']
  })

  items: Item[] = []

  itemsSub: Subscription;

constructor(
  private fb: FormBuilder,
  private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.getItemsFromServer();
  }

  getItems() {
    this.items = this.itemsService.getItems();
  }

  onSubmitForm() {
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

}
