import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HnBuyersApiService , HnBuyersUserSettingsService} from '../providers/shared';
import { Storage } from '@ionic/storage';

import { BuyOrderDetailPage, 
         DepartmentsPage, 
         BuyOrderHeaderPage, 
         SupplierPage, 
         RecentBuysPage,
         BuyOrderHomePage,
         PricePage,
         ProductPage
          } from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
    BuyOrderDetailPage,
    DepartmentsPage,
    BuyOrderHeaderPage,
    SupplierPage,
    RecentBuysPage,
    BuyOrderHomePage,
    PricePage,
    ProductPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BuyOrderDetailPage,
    DepartmentsPage,
    BuyOrderHeaderPage,
    SupplierPage,
    RecentBuysPage,
    BuyOrderHomePage,
    PricePage,
    ProductPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
              HnBuyersApiService, 
              HnBuyersUserSettingsService,
              Storage]
})
export class AppModule {}
