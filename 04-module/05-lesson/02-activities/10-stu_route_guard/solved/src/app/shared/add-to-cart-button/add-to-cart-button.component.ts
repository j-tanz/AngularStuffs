import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Item } from '../items.service';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {

  @Input() item: Item;
  buttonTitle = "Add to Cart";

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  onAddToCart(item: Item) {
    this.cartService.addItemToCart(item);

    this.buttonTitle = "Added!"

    setTimeout(() => {
      this.buttonTitle = "Add to Cart"
    }, 2500);
  }

}
