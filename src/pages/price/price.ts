import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import {HnBuyersApiService} from '../../providers/shared';
/*
  Generated class for the Price page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price',
  templateUrl: 'price.html'
})
export class PricePage {
  allStandings: any[];

  standings: any[];
  header: any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
              private hnBuyersApiService: HnBuyersApiService,
              private loadingController: LoadingController) {}

  ionViewDidLoad() {
    this.header = this.navParams.data;
    let departmentData = this.hnBuyersApiService.getCurrentDepartment();
    this.standings = departmentData.standings;

    this.allStandings =
      _.chain(this.standings)
       .groupBy('status')
       .toPairs()
       .map(item => _.zipObject(['statusName', 'statusStandings'], item))
       .value();

    console.log('standings:', this.standings); 
    console.log('division Standings', this.allStandings);
  }

}
