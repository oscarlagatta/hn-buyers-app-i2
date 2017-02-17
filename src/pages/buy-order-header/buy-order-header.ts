import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { BuyOrderHomePage} from '../pages';
import { HnBuyersApiService } from '../../providers/shared';

@Component({
  selector: 'page-buy-order-header',
  templateUrl: 'buy-order-header.html'
})
export class BuyOrderHeaderPage {

  private allHeaders: any;
  private allHeadersDivisions: any;

  headers = [];

  queryText: string = "";

  constructor(public navCtrl: NavController, 
              private loadingController: LoadingController,
              public navParams: NavParams,
              private hnBuyersApiService:  HnBuyersApiService) {}

  ionViewDidLoad() {
    let selectedDepartment = this.navParams.data;
    
    let loader = this.loadingController.create({
        content: 'Loading Buy Headers...'
    });

   /**
    * loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
            _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();

        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams); 
        loader.dismiss();
      });
    });
    */
    loader.present().then(()=> {
            this.hnBuyersApiService.getDepartmentData(selectedDepartment.id).subscribe(data => {   

                this.allHeaders = data.headers;
                               
                // using lodash to subdivide the data
                this.allHeadersDivisions = 
                  _.chain(data.headers)
                   .groupBy('status')
                  .toPairs()
                  .map(item => _.zipObject(['statusName', 'statusHeaders'], item))
                  .value();

                this.headers = this.allHeadersDivisions;

                console.log('divison headers', this.headers);
                
                loader.dismiss();
            });
    });


    
  }

  itemTapped($event, header) {
      this.navCtrl.push(BuyOrderHomePage, header);
  }

  updateHeaders(){

      let queryTextLower = this.queryText.toLowerCase();
      let filteredHeaders = [];
      _.forEach(this.allHeadersDivisions, hd => {
          let headers = _.filter( hd.statusHeaders, t => (<any>t).name.toLowerCase().includes(queryTextLower));
          if (headers.length)
          {
              filteredHeaders.push( { statusName: hd.statusName, statusHeaders: headers })
          }
      });

      this.headers = filteredHeaders;

  }

}
