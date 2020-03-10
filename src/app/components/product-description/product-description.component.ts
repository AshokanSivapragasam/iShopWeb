import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductModel } from '../../models/product.models';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  private routeParams: Params;
  productId: string;
  product: ProductModel;
  showMagnified: boolean = true;

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
    .subscribe(_product_ => {
      this.product = _product_;
    });
  }

  showMagnifiedImageAside(imageTargetId: string, resultTargetId: string) {
    this.showMagnified = true;
    var imageTargetElement, lensElement, resultTargetElement, cx, cy;
    imageTargetElement = document.getElementById(imageTargetId);
    resultTargetElement = document.getElementById(resultTargetId);
    /*create lens:*/
    lensElement = document.createElement("DIV");
    lensElement.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    imageTargetElement.parentElement.insertBefore(lensElement, imageTargetElement);
    if (document.getElementsByClassName('img-zoom-lens').length > 1) {
      document.getElementsByClassName('img-zoom-lens')[1].remove();
    }
    /*calculate the ratio between result DIV and lens:*/
    cx = resultTargetElement.offsetWidth / lensElement.offsetWidth;
    cy = resultTargetElement.offsetHeight / lensElement.offsetHeight;
    /*set background properties for the result DIV:*/
    resultTargetElement.style.backgroundImage = "url('" + imageTargetElement.src + "')";
    resultTargetElement.style.backgroundSize = (imageTargetElement.width * cx) + "px " + (imageTargetElement.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lensElement.addEventListener("mousemove", moveLens);
    imageTargetElement.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lensElement.addEventListener("touchmove", moveLens);
    imageTargetElement.addEventListener("touchmove", moveLens);

    function moveLens(eventObject) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      eventObject.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPosition(eventObject);
      /*calculate the position of the lens:*/
      x = pos.x - (lensElement.offsetWidth / 2);
      y = pos.y - (lensElement.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > imageTargetElement.width - lensElement.offsetWidth) { x = imageTargetElement.width - lensElement.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > imageTargetElement.height - lensElement.offsetHeight) { y = imageTargetElement.height - lensElement.offsetHeight; }
      if (y < 0) { y = 0; }
      /*set the position of the lens:*/
      lensElement.style.left = x + "px";
      lensElement.style.top = y + "px";
      /*display what the lens "sees":*/
      resultTargetElement.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPosition(eventObject) {
      var a, x = 0, y = 0;
      eventObject = eventObject || window.event;
      /*get the x and y positions of the image:*/
      a = imageTargetElement.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = eventObject.pageX - a.left;
      y = eventObject.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  hideMagnifiedImage() {
    this.showMagnified = false;
  }
}
