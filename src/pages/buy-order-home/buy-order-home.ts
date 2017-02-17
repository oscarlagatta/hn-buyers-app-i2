import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  BuyOrderDetailPage, PricePage} from '../pages';

@Component({
  selector: 'page-buy-order-home',
  templateUrl: 'buy-order-home.html'
})
export class BuyOrderHomePage {

  header: any;
  buyOrderDetailTab = BuyOrderDetailPage;
  priceTab = PricePage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      console.log('Params Data buy order home: ', this.navParams.data)
      this.header = this.navParams.data;

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BuyOrderHomePage');
  }

  goHome() {
     // this.navCtrl.push(RecentBuysPage);
      this.navCtrl.popToRoot();
  }
}
