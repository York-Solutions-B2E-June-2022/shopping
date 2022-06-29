import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {IProduct} from "./IProduct";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  cartList: Array<IProduct>;
  cartListSub: Subscription;

  constructor(private dataService: DataService) {
    this.cartList = this.dataService.getCart();
    this.cartListSub = this.dataService.cart$.subscribe((newCart) => {
      this.cartList = newCart;
    })
  }

  ngOnDestroy() {
    this.cartListSub.unsubscribe();
  }
}
