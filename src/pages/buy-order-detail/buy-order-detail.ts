import { Component } from '@angular/core';
import { AlertController,  NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';

import {HnBuyersApiService} from '../../providers/shared';
import {ProductPage} from '../pages';


@Component({
  selector: 'page-buy-order-detail',
  templateUrl: 'buy-order-detail.html'
})
export class BuyOrderDetailPage {
  dateFilter: string;
  useDateFilter = false;

  allproducts: any[];

  products: any[];

  isFollowing = false;

  teamStanding: any;

  header: any;

  private departmentData: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private hnBuyersApiService: HnBuyersApiService,
              private alertController: AlertController,
              private toastController:ToastController) {
     
      //console.log("** nav params: ", this.navParams.data);
      
  }

  ionViewDidLoad() {

    this.header = this.navParams.data;
    //console.log('rooter parameters: ',  this.navParams.data);
    

    //getDepartmentData
    this.departmentData = this.hnBuyersApiService.getCurrentDepartment();
    //console.log('DeparmentData: ', this.departmentData);
    
    this.products = _.chain(this.departmentData.products)
                     .filter( p => p.team1Id === this.header.id || p.team2Id === this.header.id)
                     .map( p => {
                       let isTeam1 = ( p.team1Id === this.header.id);
                       let opponentName = isTeam1 ? p.team2 : p.team1;
                       let scoreDisplay = this.getScoreDisplay(isTeam1, p.team1Score, p.team2Score);
                       return {
                          Id: p.id,
                          opponent: opponentName,
                          time: Date.parse(p.time),
                          location: p.location,
                          locationUrl: p.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                       };
                     })
                     .value();
    
    this.allproducts = this.products;
    
    this.teamStanding = _.find(this.departmentData.standings, { 'teamId': this.header.id });
    
    //console.log('this.products', this.products);
    
    //console.log('ionViewDidLoad BuyOrderDetailPage');
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
      if(team1Score && team2Score) {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score : team1Score);
        var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
        return winIndicator + teamScore + "-" + opponentScore;
      }

  }

  productClicked($event, product) {
    // console.log('DepartmentData: ', this.departmentData);
    // console.log('Product to find: ', product);
    
    let sourceProduct = this.departmentData.products.find( p => p.id === product.Id);
    //console.log('Product', product);
    //console.log('sourceProduct: ', sourceProduct);
    this.navCtrl.parent.parent.push(ProductPage, sourceProduct);

  }

  dateChanged(){
    if( this.useDateFilter) {
        console.log('this.useDateFilter', this.useDateFilter);
        this.products = _.filter(this.allproducts, p => moment(p.time).isSame(this.dateFilter, 'day'));
    } else {
      console.log('this.useDateFilter', this.useDateFilter);
      this.products = this.allproducts;
    }
  }

  getScoreWorL(product){
        return product.scoreDisplay ? product.scoreDisplay[0] : '';
  }

 getScoreDisplayBadgeClass(product){
    return product.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  } 

  toggleFollow() {

      if(this.isFollowing) {
          let confirm = this.alertController.create({
              title: 'Unfollow buy?',
              message: 'Are you sure you want to unfollow this buy?',
              buttons: [
                    {
                      text: 'Yes',
                      handler: () => {
                        this.isFollowing = false;
                        // TODO: persist data

                        let toast = this.toastController.create({
                          message: 'You have unfollowed this buy',
                          duration: 2000,
                          position: 'bottom'
                        });
                        toast.present();
                      }
                    },
                    {
                      text: 'No'
                    }
              ]
          });
          confirm.present();
      } else {
        this.isFollowing  = true;
        // TODO: Persist data
      }
  }

  refreshAll(refresher) {
      this.hnBuyersApiService.refreshCurrentDepartment()
            .subscribe(() => {
              refresher.complete();
              this.ionViewDidLoad();
            });

  }
}
