import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductModel } from '../models/product.models';
import { ProductService } from '../product.service';
import { Router, Scroll } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewChecked {
  products: ProductModel[];
  scrollPosition: [number, number];
  newSearchKeyword: string;
  constructor(private productService: ProductService,
              private messengerService: MessengerService,
              private router: Router,
              private viewportScroller: ViewportScroller) {
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      this.scrollPosition = e.position;
    });
  }
  ngOnInit() {
    this.messengerService.searchKeyWordObservable
    .subscribe(_newSearchKeyword_ => {
      this.newSearchKeyword = _newSearchKeyword_;
      let filterCondition = '?$filter=contains(title,%20%27' + this.newSearchKeyword + '%27)%20or%20contains(brand,%20%27' + this.newSearchKeyword + '%27)';
      this.productService.getProductsByFilter(filterCondition)
        .subscribe(_products_ => {
          this.products = _products_;
        });
    });
  }

  ngAfterViewChecked() {
    this.viewportScroller.scrollToPosition(this.scrollPosition == null ? [0, 0]: this.scrollPosition);
  }

  getMoreDetailsAbout(product: ProductModel) {
    this.router.navigate(['products/'+product._id.$oid]);
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
