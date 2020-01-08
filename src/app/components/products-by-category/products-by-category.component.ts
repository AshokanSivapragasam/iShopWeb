import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ProductModel } from '../../models/product.models';
import { ProductService } from '../../services/product.service';
import { Router, Scroll } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit, OnDestroy, AfterViewChecked {
  productsByCategory = new Object();
  productsByCategoryKeys: Array<string>;
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
          this.productsByCategory = this.categorizeProducts(_products_);
        });
    });
  }

  ngAfterViewChecked() {
    this.viewportScroller.scrollToPosition(this.scrollPosition == null ? [10, 10]: this.scrollPosition);
  }

  getMoreDetailsAbout(productId: string) {
    this.router.navigate(['products/'+productId]);
  }

  categorizeProducts(_products_: ProductModel[]) {
    let _productsByCategory_ = new Object();
    _products_.forEach(_product_ => {
      var _productBrand_ =_product_.brand ? _product_.brand: 'Uncategorized';
      var _productsByOneCategory_ = _productsByCategory_[_productBrand_];
      if(_productsByOneCategory_=== undefined) _productsByOneCategory_ = [];
      _productsByOneCategory_.push(_product_);
      _productsByCategory_[_productBrand_] = _productsByOneCategory_;
      
    });

    this.productsByCategoryKeys = Object.keys(_productsByCategory_);
    return _productsByCategory_;
  }

  ngOnDestroy() {
    this.messengerService.spreadNewSearchKeyWord('');
    this.messengerServiceSubscription.unsubscribe();
    this.productServiceSubscription.unsubscribe();
  }
}
