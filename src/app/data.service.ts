import {Injectable} from '@angular/core';

import PRODUCT_DATA from "../assets/products.json";
import {IProduct} from "./IProduct";
import {Subject} from "rxjs";
import {ICartItem} from "./ICartItem";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productData: Array<IProduct> = PRODUCT_DATA.products;

  private cart: Array<ICartItem> = [];
  cart$ = new Subject<Array<ICartItem>>();

  constructor() {
    console.log(this.productData)
  }

  getCart() {
    return [...this.cart]
  }

  addProductToCart(product: IProduct) {
    const foundItem = this.cart.find((i) => i.name === product.name);
    if (foundItem) {
      foundItem.count++;
    } else {
      this.cart.push({...product, count: 1});
    }

    this.cart$.next(this.cart);
  }

  removeProductFromCart(product: IProduct) {
    const index = this.cart.findIndex((item) => {
      return item.name === product.name
    });

    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    this.cart$.next(this.cart);
  }

  updateCartCount(product: ICartItem, count: number) {
    const foundItem = this.cart.find((i) => i.name === product.name);
    if (foundItem) {
      if (count === 0) {
        return this.removeProductFromCart(product);
      }

      foundItem.count = count;
    }

    this.cart$.next(this.cart);
  }

}
