import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemsService, Item } from '../shared/items.service';
import { Subscription } from 'rxjs';

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
    this.itemsService.addItem(name, description, price, imageUrl)

    this.addItemForm.reset();
  }

  onDeleteItem(i: number) {
    this.itemsService.deleteItemByIndex(i);
    this.getItems();
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
