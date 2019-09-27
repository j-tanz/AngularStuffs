import { Injectable } from '@angular/core';
import * as uuid from 'uuid'

export class Item {

  constructor(name: string, description?: string, price?: number, imageUrl?: string) {
    this.name = name;

    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;

    this.itemId = uuid.v4();
  }

  name: string;
  itemId: string;

  description?: string;
  imageUrl?: string;
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items = [
    new Item("Dog Leash", "A useful dog leash", 15, "https://via.placeholder.com/100"),
    new Item("Dog Food", "The best kibble around", 25, "https://via.placeholder.com/100"),
    new Item("Dog Bed", "The coziest bed for the goodest doggo", 25, "https://via.placeholder.com/100"),
  ];

  constructor() { }

  getItems(): Item[] {
    return this.items;
  }

  deleteItem(item: Item) {
    this.items = this.items.filter((itemToFilter: Item) => {
      return item.itemId !== itemToFilter.itemId;
    })
    console.log('deleted item! Remaining items:', this.items)
  }

  addItem(name: string, description?: string, price?: number, imageUrl?: string) {
    const newItem = new Item(name, description, price, imageUrl);
    this.items.push(newItem);

    console.log('Item added', this.items)
  }

}
