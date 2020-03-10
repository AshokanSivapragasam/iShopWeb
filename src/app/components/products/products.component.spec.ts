import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Scroll, Routes } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';
import { ViewportScroller, Location } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as ProductsJsonData from '../../../assets/data/_products.json';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let router: Router;
  let messengerService: MessengerService;
  let productService: ProductService;
  let viewportScroller: ViewportScroller;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,
        RegisterComponent,
        HomeComponent,
        ProductsComponent,
        ProductDescriptionComponent ],
      imports: [HttpClientTestingModule,FormsModule,
        ReactiveFormsModule,
        AppRoutingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    messengerService = TestBed.get(MessengerService);
    productService = TestBed.get(ProductService);
    viewportScroller = TestBed.get(ViewportScroller);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  afterEach(()=> {
    localStorage.removeItem('user-identity');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to more details page about the product without login', fakeAsync(() => {
    // Arrange
    spyOn(router, 'navigate').and.callThrough();

    // Act
    component.getMoreDetailsAbout('537f3aaac769230000be7e5f');
    tick();

    fixture.whenStable().then(() => {  
      // Assert
      expect(component).toBeTruthy();
      expect(router.navigate).toHaveBeenCalledTimes(2);
      expect(router.navigate).toHaveBeenCalledWith(['products/537f3aaac769230000be7e5f']);
      expect(location.path()).toEqual('/login');
      expect(router.navigated).toEqual(true);  
    });
  }));

  it('navigates to more details page about the product with login', fakeAsync(() => {
    // Arrange
    spyOn(router, 'navigate').and.callThrough();
    localStorage.setItem('user-identity', JSON.stringify({'someProperty': 'someProperty'}));

    // Act
    component.getMoreDetailsAbout('537f3aaac769230000be7e5f');
    tick();

    fixture.whenStable().then(() => {  
      // Assert
      expect(component).toBeTruthy();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['products/537f3aaac769230000be7e5f']);
      expect(location.path()).toEqual('/products/537f3aaac769230000be7e5f');
      expect(router.navigated).toEqual(true);  
    });
  }));

  it('gets products', fakeAsync(() => {
    // Arrange
    const expectedSearchWord = '_searchit_';
    spyOn(messengerService, 'getNewSearchKeyWord').and.returnValue(of(expectedSearchWord));
    spyOn(productService, 'getProductsByFilter').and.returnValue(of(JSON.parse(JSON.stringify(ProductsJsonData.products))));

    // Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();
      
    // Assert
    expect(component.newSearchKeyword).toEqual(expectedSearchWord);
    expect(productService.getProductsByFilter).toHaveBeenCalledWith('?$filter=contains(title,%20%27' + expectedSearchWord + '%27)%20or%20contains(brand,%20%27' + expectedSearchWord + '%27)');
    expect(component.products.length).toEqual(10);
    expect(component.products[0]._id.oid).toEqual('537f3aaac769230000be7e5f');
  }));

  it('get products with empty search keyword', fakeAsync(() => {
    // Arrange
    spyOn(messengerService, 'getNewSearchKeyWord').and.returnValue(of(''));
    spyOn(productService, 'getProductsByFilter').and.returnValue(of(JSON.parse('[{"_id":{"oid":"537f3aaac769230000be7e60"},"images":{"small":{"url":"http://ecx.images-amazon.com/images/I/41kXCp%2BUyeL._SL75_.jpg","width":53,"height":75},"medium":{"url":"http://ecx.images-amazon.com/images/I/41kXCp%2BUyeL._SL160_.jpg","width":113,"height":160},"large":{"url":"http://ecx.images-amazon.com/images/I/41kXCp%2BUyeL.jpg","width":353,"height":500}},"description":["This world was saved twenty years prior by a handful of unnamed heroes in Diablo II. Warriors that survived the onslaught of the armies of the Burning Hells have gone mad from their ordeals and it is up to a new generation of heroes to face the forces of evil threatening the world of Sanctuary. Players will have the opportunity to explore familiar settings such as Tristram.<br /><br />This game will work on PC or Mac with the one disc that comes in the box. Internet connection is required."],"metadata":[{"key":"binding","value":"Computer Game"},{"key":"brand","value":"Blizzard Entertainment"},{"key":"catalognumberlist","value":{"CatalogNumberListElement":["020626728515","72851"]}},{"key":"department","value":"mens"},{"key":"ean","value":"0020626728515"},{"key":"edition","value":"Standard"},{"key":"esrbagerating","value":"Mature"},{"key":"feature","value":["The Witch Doctor is a new character reminiscent of the Diablo II Necromancer","The Barbarians will have a variety of revamped skills at their disposal based on the use of their incredible physical prowess.","1-on-1 dueling system coming into play.","Five new character classes, including the otherworldly Witch Doctor, or with re-imagined warriors from Diablos past, like the powerful Barbarian","Experience a new approach to in-game health as the previous reliance on mana and potions is appended by resource types unique to each class, as well as health globes","In single player quests utilize up to three AI followers, from three different classes who can be equiped with basic items and leveled up","Sell unique items found within the game for in-game gold or real money via online Auction House functionality","The new Rune System in which skills and abilities are now automatically unlocked as you level"]},{"key":"format","value":["DVD-ROM","CD-ROM"]},{"key":"genre","value":"adventure-game-genre"},{"key":"hardwareplatform","value":"Pc"},{"key":"isautographed","value":"0"},{"key":"ismemorabilia","value":"0"},{"key":"label","value":"Blizzard Entertainment"},{"key":"manufacturer","value":"Blizzard Entertainment"},{"key":"model","value":"728515"},{"key":"mpn","value":"GACT-728515"},{"key":"numberofitems","value":1},{"key":"operatingsystem","value":"Windows 7"},{"key":"packagequantity","value":"1"},{"key":"partnumber","value":"GACT-728515"},{"key":"platform","value":["Windows Vista","Windows XP","Windows 7","Mac OS X Intel"]},{"key":"productgroup","value":"Video Games"},{"key":"producttypename","value":"SOFTWARE_GAMES"},{"key":"publisher","value":"Blizzard Entertainment"},{"key":"releasedate","value":{"$date":"2012-05-14T22:00:00+00:00"}},{"key":"studio","value":"Blizzard Entertainment"},{"key":"title","value":"Diablo III - PC"},{"key":"upc","value":"020626728515"},{"key":"upclist","value":{"UPCListElement":["020626728515"]}}],"binding":"Computer Game","brand":"Blizzard Entertainment","catalognumberlist":{"CatalogNumberListElement":["020626728515","72851"]},"ean":"0020626728515","esrbagerating":"Mature","feature":["The Witch Doctor is a new character reminiscent of the Diablo II Necromancer","The Barbarians will have a variety of revamped skills at their disposal based on the use of their incredible physical prowess.","1-on-1 dueling system coming into play.","Five new character classes, including the otherworldly Witch Doctor, or with re-imagined warriors from Diablos past, like the powerful Barbarian","Experience a new approach to in-game health as the previous reliance on mana and potions is appended by resource types unique to each class, as well as health globes","In single player quests utilize up to three AI followers, from three different classes who can be equiped with basic items and leveled up","Sell unique items found within the game for in-game gold or real money via online Auction House functionality","The new Rune System in which skills and abilities are now automatically unlocked as you level"],"format":["DVD-ROM","CD-ROM"],"genre":"adventure-game-genre","hardwareplatform":"Pc","label":"Blizzard Entertainment","price":3999,"currency":"USD","manufacturer":"Blizzard Entertainment","model":"728515","mpn":"GACT-728515","numberofitems":1,"operatingsystem":"Windows 7","packagequantity":1,"partnumber":"GACT-728515","platform":["Windows Vista","Windows XP","Windows 7","Mac OS X Intel"],"productgroup":"Video Games","producttypename":"SOFTWARE_GAMES","publisher":"Blizzard Entertainment","releasedate":{"$date":"2012-05-15T00:00:00.000+0200"},"studio":"Blizzard Entertainment","title":"Diablo III - PC","upc":"020626728515","upclist":{"UPCListElement":["020626728515"]},"category":"/games/pc","salesrank":69,"department":"mens","edition":"Standard","isautographed":0,"ismemorabilia":0}]')));
    // Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();
      
    // Assert
    expect(component.newSearchKeyword).toEqual('');
    expect(component.products.length).toEqual(1);
    expect(component.products[0]._id.oid).toEqual('537f3aaac769230000be7e60');
  }));

  it('get last scroll position', () => {
    // Arrange
    spyOn(router.events, 'pipe').and.returnValues(of(new Scroll(null, [1,200], '#')), of(new Scroll(null, [1,201], '#')));
    // Act
    component.getLastScrollPosition();
    fixture.detectChanges();
      
    // Assert
    expect(component.scrollPosition).toEqual([1,200]);
  });

  it('get viewport scroll position', fakeAsync(() => {
    // Arrange
    component.scrollPosition = [1, 1];
    spyOn(viewportScroller, 'scrollToPosition').and.callThrough().and.callFake((pn)=>{
      console.log(pn);
    });

    spyOn(viewportScroller, 'getScrollPosition').and.callThrough().and.callFake(()=>{
      return [1,1];
    });

    // Act
    component.ngAfterViewChecked();
    tick();

    fixture.whenStable().then(()=> {
      fixture.detectChanges();
      // Assert
      expect(component.scrollPosition).toEqual([1, 1]);
      expect(viewportScroller.getScrollPosition()).toEqual([1, 1]);
      expect(viewportScroller.scrollToPosition).toHaveBeenCalledTimes(2);
    });
  }));

  it('de-duplicate the array', async(() => {
    // Arrange
    var duplicateArray = [{title: 't01'}, {title: 't01'}, {title: 't01'}, {title: 't02'}, {title: 't03'}];
    spyOn(viewportScroller, 'scrollToPosition').and.callThrough().and.callFake((pn)=>{
      console.log(pn);
    });

    spyOn(viewportScroller, 'getScrollPosition').and.callThrough().and.callFake(()=>{
      return [1,1];
    });

    // Act
    var deduplicatedArray = component.deduplicateArray(duplicateArray);

    // Assert
    expect(deduplicatedArray).toBeDefined();
    expect(deduplicatedArray.length).toEqual(3);
    expect(deduplicatedArray).toContain({title: 't01'});
    expect(deduplicatedArray).toContain({title: 't02'});
    expect(deduplicatedArray).toContain({title: 't03'});
  }));

  it('de-duplicate an empty array', async(() => {
    // Arrange
    var duplicateArray = [];

    // Act
    var deduplicatedArray = component.deduplicateArray(duplicateArray);

    // Assert
    expect(deduplicatedArray).toBeDefined();
    expect(deduplicatedArray.length).toEqual(0);
  }));

  it('de-duplicate an null array', async(() => {
    // Arrange
    var duplicateArray = null;

    // Act
    var deduplicatedArray = component.deduplicateArray(duplicateArray);

    // Assert
    expect(deduplicatedArray).toBeDefined();
    expect(deduplicatedArray.length).toEqual(0);
  }));

  it('de-duplicate an undefined array', async(() => {
    // Arrange
    var duplicateArray = undefined;

    // Act
    var deduplicatedArray = component.deduplicateArray(duplicateArray);

    // Assert
    expect(deduplicatedArray).toBeDefined();
    expect(deduplicatedArray.length).toEqual(0);
  }));

});
