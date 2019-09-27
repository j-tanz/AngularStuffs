import { Injectable } from '@angular/core';
import * as uuid from 'uuid'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = "https://crudpi.io/39f94f"

export class Item {

  constructor(name: string, description?: string, price?: number, imageUrl?: string) {
    this.name = name;

    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  id?: number; //would come from server

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

  items = [];

  constructor(
    private http: HttpClient
  ) { }

  /**
   * API calls
   */
  getItemsFromServer(): Observable<Item[]> {
    const url = apiUrl + "/items";
    return this.http.get<Item[]>(url)
  }

  getItemByIdFromServer(itemId: number): Observable<Item> {
    const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId

    return this.http.get<Item>(url)
  }

  createNewItemOnServer(name: string, description?: string, price?: number, imageUrl?: string): Observable<Item> {

    const newItem = new Item(name, description, price, imageUrl);

    const url = apiUrl + `/items`; // same as "/items/" + itemId
    const body = newItem;
    return this.http.post<Item>(url, body)
  }

  updateItemOnServer(itemId: number, name: string, description: string, price: number, imageUrl: string): Observable<Item> {

    const newItem = new Item(name, description, price, imageUrl);

    const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId
    const body = newItem;

    return this.http.put<Item>(url, body)
  }


  deleteItemByIdFromServer(itemId: number): Observable<Item> {
    const url = apiUrl + `/items/${itemId}`; // same as "/items/" + itemId
    return this.http.delete<Item>(url)
  }

  /**
   * End API calls
   */

  getItemByIndex(index: number): Item | null {
    if (this.items[index]) {
      return this.items[index]
    } else {
      return null;
    }
  }

  getItems(): Item[] {
    console.log('items', this.items);

    return this.items;
  }


  deleteItem(item: Item) {
    this.items = this.items.filter((itemToFilter: Item) => {
      return item.itemId !== itemToFilter.itemId;
    })
    console.log('deleted item! Remaining items:', this.items)
  }

  deleteItemByIndex(index: number) {
    this.items.splice(index, 1);
    console.log('deleted item! Remaining items:', this.items)
  }

  addItem(name: string, description?: string, price?: number, imageUrl?: string) {
    const newItem = new Item(name, description, price, imageUrl);
    this.items.push(newItem);

    console.log('Item added', this.items)
  }

}
