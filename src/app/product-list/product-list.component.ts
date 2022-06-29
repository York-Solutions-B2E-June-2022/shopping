import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {IProduct} from "../IProduct";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Array<IProduct>;
  selectedSort: string = "rating";
  searchText: string = "";

  constructor(private dataService: DataService) {
    this.productList = dataService.productData;
    this.sort(this.selectedSort);
  }

  ngOnInit(): void {
  }

  sort(selectedSort: string) {
    this.selectedSort = selectedSort;
    this.productList = this.productList.sort(
      (a, b) => {
        switch (this.selectedSort) {
          case "price":
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          case "rating":
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
          case "title":
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          default:
            return 0;
        }
      }
    );
  }

  filter(searchText: string) {
    this.searchText = searchText;
    this.productList = this.dataService.productData
      .filter(product => {
          return product.name
            .toUpperCase()
            .includes(this.searchText.toUpperCase())
        }
      );
  }
}
