import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {IProduct} from "../IProduct";
import {Subscription} from "rxjs";
import {ICartItem} from "../ICartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy {

  cartList: Array<ICartItem>;
  cartListSub: Subscription;

  tax: number = 0.07;

  subtotal: number = 0;
  taxCost: number = 0;
  shippingCost: number = 0;
  total: number = 0;

  constructor(private dataService: DataService) {
    this.cartList = this.dataService.getCart();
    this.updateCostTotals();

    this.cartListSub = this.dataService.cart$.subscribe((newCart) => {
      this.cartList = newCart;
      this.updateCostTotals();
    })
  }

  updateCostTotals() {
    this.subtotal = 0;
    for (let item of this.cartList) {
      this.subtotal += item.price * item.count;
    }

    this.taxCost = this.subtotal * this.tax;
    this.shippingCost = this.subtotal > 25 ? 0 : 5;
    this.total = this.subtotal + this.taxCost + this.shippingCost;
  }

  ngOnDestroy(): void {
    this.cartListSub.unsubscribe();
  }

}
