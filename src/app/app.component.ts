import { Component,EventEmitter } from '@angular/core';
import { Http,Headers } from '@angular/http';
import "../../public/resources/vendor/semantic.min.css";
import "../../public/resources/css/style.css";
import 'rxjs/add/operator/toPromise';
var queryString = require ("querystring");

// /**
//  * Product
//  */
// class Product {
//     constructor(
//         public sku:string,
//         public name:string,
//         public imageUrl:string,
//         public department:string[],
//         public price:number) {

//          }
// }
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// /**
//  * 图片显示组建
//  */
// @Component({
//     selector:'product-image',
//     host:{class:'ui small image'},
//     inputs:['product'],
//     template:`
//         <img class="product-image" [src]="product.imageUrl" />
//     `
// })

// class ProductImage {
//     constructor(public product:Product) {
//     }
// }

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// /**
//  * 产品部门组件
//  */
// @Component({
//     selector:'product-department',
//     inputs:['product'],
//     template:`
//         <div class="product-department">
//             <span *ngFor="let name of product.department;let i=index">
//                 <a href="#">{{name}}</a>
//                 <span>{{i<(product.department.length-1)?'>':''</span>
//             </span>
//         </div>
//     `
// })
// class ProductDepartment {
//     constructor(public product:Product) {
//     }
// }

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// @Component({
//     selector:'price-display',
//     inputs:['price'],
//     template:`
//         <div class="price-display">\${{price}}</div>
//     `
// })
// class PriceDisplay {
//     constructor(public price:number) {
        
//     }
// }

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// /**
//  * productRow
//  */
// @Component({
//     selector:'product-row',
//     inputs:['product'],
//     host:{'class':'item'},
//     directives:[ProductImage,ProductDepartment,PriceDisplay],
//     template:`
//         <product-image [product]="product"></product-image>
//         <div class="content">
//             <div class="header">{{product.name}}</div>
//             <div class="meta">
//                 <div class="product-sku">SKU #{{product.sku}}</div>
//             </div>
//             <div class="description">
//                 <product-department [product]="product"></product-department>
//             </div>
//         </div>
//         <price-display [price]="product.price"></price-display>
//     `
// })
// class ProductRow {
//     constructor(public product:Product) {
        
//     }
// }

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// @Component({
//   selector: 'products-list',
//   directives: [ProductRow],
//   inputs: ['productList'],
//   outputs: ['onProductSelected'],
//   template: `
//   <div class="ui items">
//     <product-row 
//       *ngFor="let myProduct of productList" 
//       [product]="myProduct" 
//       (click)='clicked(myProduct)'
//       [class.selected]="isSelected(myProduct)">
//     </product-row>
//   </div>
//   `
// })
// class ProductList {
//     productList: Product[]
//     onProductSelected: EventEmitter<Product>;
//     currentProduct: Product;

//     constructor() {
//         this.onProductSelected = new EventEmitter<Product>();
//     }

//     clicked(product:Product):void{
//         this.currentProduct = product;
//         this.onProductSelected.emit(product);
//     }

//     isSelected(product:Product):boolean{
//         if(!product||!this.currentProduct){
//             return false;
//         }
//         return product.sku === this.currentProduct.sku;
//     }
// }

// /////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////

/**
 * Provides a `Product` object
 */
class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number) {
  }
}

/**
 * @ProductImage: A component to show a single Product's image 
 */
@Component({
  selector: 'product-image',
  host: {class: 'ui small image'},
  inputs: ['product'],
  template: `
  <img class="product-image" [src]="product.imageUrl">
  `
})
class ProductImage {
  product: Product;
}

/**
 * @ProductDepartment: A component to show the breadcrumbs to a 
 * Product's department
 */
@Component({
  selector: 'product-department',
  inputs: ['product'],
  template: `
  <div class="product-department">
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{ name }}</a>
      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
    </span>
  </div>
  `
})
class ProductDepartment {
  product: Product;
}

/**
 * @PriceDisplay: A component to show the price of a 
 * Product
 */
@Component({
  selector: 'price-display',
  inputs: ['price'],
  template: `
  <div class="price-display">\${{ price }}</div>
  `
})
class PriceDisplay {
  price: number;
}

/**
 * @ProductRow: A component for the view of single Product
 */
@Component({
  selector: 'product-row',
  inputs: ['product'],
  host: {'class': 'item'},
  directives: [ProductImage, ProductDepartment, PriceDisplay],
  template: `
  <product-image [product]="product"></product-image>
  <div class="content">
    <div class="header">{{ product.name }}</div>
    <div class="meta">
      <div class="product-sku">SKU #{{ product.sku }}</div>
    </div>
    <div class="description">
      <product-department [product]="product"></product-department>
    </div>
  </div>
  <price-display [price]="product.price"></price-display>
  `
})
class ProductRow {
  product: Product;
}

/**
 * @ProductsList: A component for rendering all ProductRows and 
 * storing the currently selected Product
 */
@Component({
  selector: 'products-list',
  directives: [ProductRow],
  inputs: ['productList'],
  outputs: ['onProductSelected'],
  template: `
  <div class="ui items">
    <product-row 
      *ngFor="let myProduct of productList" 
      [product]="myProduct" 
      (click)='clicked(myProduct)'
      [class.selected]="isSelected(myProduct)">
    </product-row>
  </div>
  `
})
class ProductsList {
  /**
   * @input productList - the Product[] passed to us
   */
  productList: Product[];

  /**
   * @ouput onProductSelected - outputs the current 
   *          Product whenever a new Product is selected
   */
  onProductSelected: EventEmitter<Product>;

  /**
   * @property currentProduct - local state containing 
   *             the currently selected `Product`
   */
  currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter<Product>();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

}

@Component({
    selector:'my-app',
    directives:[ProductsList],
    template:`
        <div class='ui container inventory-app'>
            <products-list
                [productList]="products"
                (onProductSelected)="productWasSelected($event)">
            </products-list>
        </div>
    `
})
export class AppComponent {
    products: Product[];
    constructor(public http:Http) {
        this.products = [
            new Product(
                'MYSHOES', 'Black Running Shoes',
                require('../../public/resources/images/products/black-shoes.jpg'),
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                require('../../public/resources/images/products/blue-jacket.jpg'),
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT', 'A Nice Black Hat',
                require('../../public/resources/images/products/black-hat.jpg'),
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ];

    }

    productWasSelected(product:Product):void{

        console.log("process.cwd():",process.cwd());
        console.log("Url:",document.URL);
        console.log("__dirname:",__dirname);
        console.log("pathname:",location.pathname);
        console.log("host:",location.host);
        console.log("hostname:",location.hostname);
        console.log("protocol:",location.protocol);
        console.log("prot:",location.port);
        
        
        
        console.log('Product click:',product);
        
        var qr = queryString.stringify({ "test": "123", "name": "tian" });
        console.log("qr:" + qr);
        var parttens = location.pathname.split('/');
       
        if(parttens.length>2){
          var temp = parttens[1];
          var url = location.protocol + "//" + location.host + "/" + temp + "/";
        }else{
          temp = "serviceWeb"
          url = location.protocol + "//" + location.hostname + ":8080" + "/" + temp + "/";
        }

        console.log("parttens:", parttens);

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        
        console.log("url:" + url);

        this.http.post(url + "login/test.do", qr, { headers: headers })
          // .map(res => res.json())
          .subscribe(
            data => console.log("data:",data)
          );

    }
}