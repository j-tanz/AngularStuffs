import { Injectable } from '@angular/core';
import { pipe, Observable, of } from 'rxjs';
import { delay } from 'q';
import { Item } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  purchaseItems(items: Item[]): Observable<Item[]> {
    return of(items);
  }
}
