import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.models';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductModel[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts()
    .subscribe(_products_ => this.products = _products_);
  }

  deduplicateArray(_products_: ProductModel[]) {
    let _unique_products_ = _products_.reduce((uniqueArray, newProduct) => {
      if (!uniqueArray.find(currentProduct => currentProduct.title === newProduct.title)) {
        uniqueArray.push(newProduct);
      }
      return uniqueArray;
    }, []);

    return _unique_products_;
  }
}
