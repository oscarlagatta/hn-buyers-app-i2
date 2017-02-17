import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { BuyOrderHeaderPage } from '../pages';
import { HnBuyersApiService } from '../../providers/shared';

@Component({
  selector: 'page-departments',
  templateUrl: 'departments.html'
})
export class DepartmentsPage {

  departments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private hnBuyersApiService: HnBuyersApiService,
              private loadingController: LoadingController) {}

  ionViewDidLoad() {
    let loader = this.loadingController.create({
        content: 'Getting Departments...',
        spinner: 'dots'
    });

    loader.present().then(()=> {

        this.hnBuyersApiService.getDepartments()
          .then(data => this.departments = data);

        loader.dismiss();
    });
  }

  itemTapped($event, department) {

     this.navCtrl.push(BuyOrderHeaderPage, department);
  }

}
