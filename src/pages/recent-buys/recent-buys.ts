import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { DepartmentsPage} from '../departments/departments';
import { BuyOrderHomePage} from '../pages';
import { HnBuyersApiService } from '../../providers/shared';


@Component({
  selector: 'page-recent-buys',
  templateUrl: 'recent-buys.html'
})
export class RecentBuysPage {

  favorites = [
      {
          header: {"id": 812, "name": "Baltimore Stars","buyer": "James", "status": "initial"},
          headerId : "3dd50aaf-6b03-4497-b074-d81703f07ee8",
          departmentName: 'Dresses'
      },
      {
            header: { "id": 795,
                    "name": "DC Assault",
                    "buyer": "Bartlett",
                    "status": "initial"},
            headerId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
            departmentName: 'Coats'
      }
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, private loadingController: LoadingController, private hnBuyersApiService: HnBuyersApiService ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentBuysPage');
  }

  goToDepartments(){
    this.navCtrl.push(DepartmentsPage);
  }

  favoriteTapped($event, favorite) {
      let loader = this.loadingController.create({
          content: 'Getting data...',
          dismissOnPageChange: true

      });

      loader.present();

      this.hnBuyersApiService.getDepartmentData(favorite.departmentId)
        .subscribe( d => this.navCtrl.push(BuyOrderHomePage, favorite.header));
  }
}
