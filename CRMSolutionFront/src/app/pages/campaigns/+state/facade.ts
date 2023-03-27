import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, skip } from 'rxjs';
import { Selectors } from './selectors';
import { CampaignListModel } from '../../../models/campaignList.model';
import { SalesCampaignModel } from '../../../models/salesCampaign.model';
import { Actions } from './actions';
import { InsuredTypesModel } from 'src/app/models/insuredTypes.model';
import { SeriesModel } from 'src/app/models/series.model';
import { CustomerCategoryModel } from 'src/app/models/customerCategory.model';
import { CustomerCategoryRefundModel } from 'src/app/models/customerCategoryRefund.model';
import { EventHistoryModel } from 'src/app/models/eventHistory.model';
import { DiscountTypeModel } from 'src/app/models/discountType.model';
import { PresentsModel } from 'src/app/models/presents.model';

@Injectable()
export class Facade {
  constructor(private store: Store<any>) {}

  campaignList$: Observable<CampaignListModel[]> = this.store.pipe(
    select(Selectors.campaignList),
    skip(1),
    filter((v) => !!v)
  );
  salesCampaign$: Observable<SalesCampaignModel[]> = this.store.pipe(
    select(Selectors.salesCampaign),
    skip(1),
    filter((v) => !!v)
  );
  insuredTypes$: Observable<InsuredTypesModel[]> = this.store.pipe(
    select(Selectors.insuredTypes),
    skip(1),
    filter((v) => !!v)
  );
  series$: Observable<SeriesModel[]> = this.store.pipe(
    select(Selectors.series),
    skip(1),
    filter((v) => !!v)
  );
  customerCategory$: Observable<CustomerCategoryModel[]> = this.store.pipe(
    select(Selectors.customerCategory),
    skip(1),
    filter((v) => !!v)
  );
  customerCategoryRefund$: Observable<CustomerCategoryRefundModel[]> = this.store.pipe(
    select(Selectors.customerCategoryRefund),
    skip(1),
    filter((v) => !!v)
  );
  eventHistory$: Observable<EventHistoryModel[]> = this.store.pipe(
    select(Selectors.eventHistory),
    skip(1),
    filter((v) => !!v)
  );
  discountType$: Observable<DiscountTypeModel[]> = this.store.pipe(
    select(Selectors.discountType),
    skip(1),
    filter((v) => !!v)
  );
  presents$: Observable<PresentsModel[]> = this.store.pipe(
    select(Selectors.presents),
    skip(1),
    filter((v) => !!v)
  );

  loading$: Observable<boolean> = this.store.pipe(
    select(Selectors.loading),
    filter((v) => !!v)
  );
  error$: Observable<any> = this.store.pipe(
    select(Selectors.error),
    filter((v) => !!v)
  );

  getCampaignList(): void {
    this.store.dispatch(Actions.getCampaignList());
  }
  getSalesCampaign(): void {
    this.store.dispatch(Actions.getSalesCampaign());
  }
  getInsuredTypes(): void {
    this.store.dispatch(Actions.getInsuredTypes());
  }
  getSeries(): void {
    this.store.dispatch(Actions.getSeries());
  }
  getCustomerCategory(): void {
    this.store.dispatch(Actions.getCustomerCategory());
  }
  getCustomerCategoryRefund(): void {
    this.store.dispatch(Actions.getCustomerCategoryRefund());
  }
  getEventHistory(): void {
    this.store.dispatch(Actions.getEventHistory());
  }
  getDiscountType(): void {
    this.store.dispatch(Actions.getDiscountType());
  }
  getPresents(): void {
    this.store.dispatch(Actions.getPresents());
  }
}
