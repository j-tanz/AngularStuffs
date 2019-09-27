import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { Item } from '../shared/items.service';
import { TransactionsService } from '../shared/transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  items: Item[] = [];
  infoText = "";

  constructor(
    private cartService: CartService,
    private transactionsService: TransactionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this.items = this.cartService.getCartItems();
  }

  onPurchase() {
    this.transactionsService.purchaseItems(this.items)
      .subscribe(
        (res: any) => {
          this.cartService.emptyCart();
          this.items = [];

          this.infoText = "Items successfully purchased! Redirecting...";

          setTimeout(() => {
            this.router.navigate(['/items'])
          }, 2500);

        },
        err => { console.error(err); },
        () => { }
      );
  }

  onRemoveItemFromCart(i: number) {
    this.cartService.deleteItemByIndex(i);
    this.getItems();
  }

}
