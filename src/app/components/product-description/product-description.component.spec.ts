import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductDescriptionComponent } from './product-description.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import * as ProductsJsonData from '../../../assets/data/_products.json';

const productId: string = '537f3aaac769230000be7e5f';

describe('ProductDescriptionComponent', () => {
  let component: ProductDescriptionComponent;
  let fixture: ComponentFixture<ProductDescriptionComponent>;
  let productService: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDescriptionComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: { 'snapshot': {'params':  {'productId': productId }}}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDescriptionComponent);
    component = fixture.componentInstance;
    productService = TestBed.get(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ng oninit', () => {
    // Arrange
    var expectedProduct = JSON.parse(JSON.stringify(ProductsJsonData.products.find(r=>r._id.$oid = productId)));
    spyOn(productService, 'getProductById').and.returnValue(of(expectedProduct));

    // Act
    component.ngOnInit();

    // Assert
    expect(component).toBeDefined();
    expect(productService.getProductById).toHaveBeenCalledWith(productId);
    expect(component.productId).toEqual(productId);
    expect(component.product._id.$oid).toEqual(productId);
    expect(component.availableOffers).toBeDefined();
    expect(component.availableOffers.length).toEqual(4);
  });

});
