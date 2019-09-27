import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

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

  constructor() { }
  items: Item[] = [];

  addItem(name: string, description?: string, price?: number, imageUrl?: string) {
    const newItem = new Item(name, description, price, imageUrl);
    this.items.push(newItem);

    console.log('Item added', this.items)
  }
}
