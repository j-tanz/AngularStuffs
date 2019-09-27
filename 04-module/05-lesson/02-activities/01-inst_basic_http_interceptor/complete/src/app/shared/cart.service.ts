import { Injectable } from '@angular/core';
import { Item } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Item[] = [];

  constructor() { }

  addItemToCart(item: Item) {
    this.items.push(item);
  }

  getCartItems(): Item[] {

    return this.items;
  }

  deleteItemByIndex(index: number) {
    this.items.splice(index, 1);
    console.log('deleted item from cart! Remaining items:', this.items)
  }

  emptyCart() {
    this.items = [];
  }
}
