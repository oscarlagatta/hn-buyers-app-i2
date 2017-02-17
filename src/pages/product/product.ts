import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HnBuyersApiService} from '../../providers/shared';
import {BuyOrderHomePage} from '../pages';
/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private hnBuyersApiService: HnBuyersApiService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.product = this.navParams.data;
    console.log('Product loaded, this.product: ', this.product);
    
  }

  // Fix as is arranged to wrong data.
  productTapped(teamId){
      //console.log('ProudctTapped: ',teamId);
      
      let departmentData = this.hnBuyersApiService.getCurrentDepartment();
      console.log('departmentData: ', departmentData);
      let header = departmentData.headers.find( p => p.id === teamId);
      console.log('product found: ',  departmentData.headers.find( p => p.id === teamId));
      
      this.navCtrl.push(BuyOrderHomePage, header);
  }

}
