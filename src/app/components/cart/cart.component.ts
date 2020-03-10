import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cart.models';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private routeParams: Params;
  cartId: string;
  cart: CartModel;

  showMagnified: boolean = true;

  availableOffers: any[] = ['Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C',
    'Bank OfferExtra 5% off* with Axis Bank Buzz Credit CardT&C',
    'Special PriceGet extra 71% off (price inclusive of discount)T&C',
    'Partner Offer₹50 to ₹500 Scratch Card with Google Pay. Once Per User. Min order value ₹500. Only on Flipkart AppKnow More'
  ];

  constructor(private cartService: CartService,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.params;
    this.cartId = this.routeParams.cartId;
    this.cartService.getCartById(this.cartId)
    .subscribe(_cart_ => {
      this.cart = _cart_;
      this.cart.cartItems.forEach((_cartItem_) => {
        this.productService.getProductById(_cartItem_.productId).subscribe(_product_ => {
          _cartItem_.productImages = _product_.images;
          _cartItem_.productTitle = _product_.title;
        });
      })
    });
  }

  getMoreDetailsAbout(productId: string) {
    this.router.navigate(['products/'+productId]);
  }
}
