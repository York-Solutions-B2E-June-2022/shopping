import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../IProduct";
import {DataService} from "../data.service";
import {ICartItem} from "../ICartItem";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // TODO - fix type for product so i can access count prop
  @Input() product!: any;
  @Input() inCart: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {}

  onAddToCart() {
    this.dataService.addProductToCart(this.product)
  }

  updateCartCount(count: number) {
    this.dataService.updateCartCount(this.product, count);
  }
}
