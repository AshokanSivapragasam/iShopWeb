import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ProductModel } from '../../models/product.models';
import { ProductService } from '../../services/product.service';
import { Router, Scroll } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewChecked {
  products: ProductModel[];
  scrollPosition: [number, number];
  newSearchKeyword: string;
  messengerServiceSubscription: Subscription;
  productServiceSubscription: Subscription;
  constructor(private productService: ProductService,
              private messengerService: MessengerService,
              private router: Router,
              private viewportScroller: ViewportScroller) {
    this.getLastScrollPosition();
  }

  getLastScrollPosition() {
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      this.scrollPosition = e.position;
    });
  }

  ngOnInit() {
    this.messengerServiceSubscription = this.messengerService.getNewSearchKeyWord()
    .subscribe(_newSearchKeyword_ => {
      this.newSearchKeyword = _newSearchKeyword_;
      let filterCondition = '?$filter=contains(title,%20%27' + this.newSearchKeyword + '%27)%20or%20contains(brand,%20%27' + this.newSearchKeyword + '%27)';
      this.productServiceSubscription = this.productService.getProductsByFilter(filterCondition)
        .subscribe(_products_ => {
          this.products = _products_;
        });
    });
  }

  ngAfterViewChecked() {
    this.viewportScroller.scrollToPosition(this.scrollPosition == null ? [10, 10]: this.scrollPosition);
  }

  getMoreDetailsAbout(productId: string) {
    this.router.navigate(['products/'+productId]);
  }

  deduplicateArray(_products_: any[]) {
    if(!_products_) return [];
    let _unique_products_ = _products_.reduce((uniqueArray, newProduct) => {
      if (!uniqueArray.find((currentProduct: ProductModel) => currentProduct.title === newProduct.title)) {
        uniqueArray.push(newProduct);
      }
      return uniqueArray;
    }, []);

    return _unique_products_;
  }

  ngOnDestroy() {
    this.messengerService.spreadNewSearchKeyWord('');
    this.messengerServiceSubscription.unsubscribe();
    this.productServiceSubscription.unsubscribe();
  }
}
