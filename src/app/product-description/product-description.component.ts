import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/product.models';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  routeParams;
  productId: number;
  product: ProductModel;

  availableOffers: any[] = ['Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C',
    'Bank OfferExtra 5% off* with Axis Bank Buzz Credit CardT&C',
    'Special PriceGet extra 71% off (price inclusive of discount)T&C',
    'Partner Offer₹50 to ₹500 Scratch Card with Google Pay. Once Per User. Min order value ₹500. Only on Flipkart AppKnow More'
  ];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.params;
    this.productId = this.routeParams.productId;
    this.productService.getProductById(this.productId)
    .subscribe(_product_ => this.product = _product_);
  }
}
