import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { Actions as eActions } from './actions';
import { map, switchMap } from 'rxjs';

import { CampaignListModel } from '../../../models/campaignList.model';
import { SalesCampaignModel } from '../../../models/salesCampaign.model';
import { InsuredTypesModel } from 'src/app/models/insuredTypes.model';
import { SeriesModel } from 'src/app/models/series.model';
import { CustomerCategoryModel } from 'src/app/models/customerCategory.model';
import { CustomerCategoryRefundModel } from 'src/app/models/customerCategoryRefund.model';
import { EventHistoryModel } from 'src/app/models/eventHistory.model';
import { DiscountTypeModel } from 'src/app/models/discountType.model';
import { PresentsModel } from 'src/app/models/presents.model';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  onGetCampaignList = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getCampaignList),
        switchMap(() =>
          this.apiService.get<CampaignListModel[]>('list').pipe(
            map((campaignList) => {
              return eActions.getCampaignListComplete({ campaignList });
            })
          )
        )
      )
  );

  onGetSalesCampaign = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getSalesCampaign),
        switchMap(() =>
          this.apiService.get<SalesCampaignModel[]>('sales-campaign').pipe(
            map((salesCampaign) => {
              return eActions.getSalesCampaignComplete({ salesCampaign });
            })
          )
        )
      )
  );

  onGetInsuredTypes = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getInsuredTypes),
        switchMap(() =>
          this.apiService.get<InsuredTypesModel[]>('List/insureTypes').pipe(
            map((insuredTypes) => {
              return eActions.getInsuredTypesComplete({ insuredTypes });
            })
          )
        )
      )
  );

  onGetSeries = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getSeries),
        switchMap(() =>
          this.apiService.get<SeriesModel[]>('List/policySeries').pipe(
            map((series) => {
              return eActions.getSeriesComplete({ series });
            })
          )
        )
      )
  );

  onGetCustomerCategory = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getCustomerCategory),
        switchMap(() =>
          this.apiService.get<CustomerCategoryModel[]>('customer-category').pipe(
            map((customerCategory) => {
              return eActions.getCustomerCategoryComplete({ customerCategory });
            })
          )
        )
      )
  );

  onGetCustomerCategoryRefund = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getCustomerCategoryRefund),
        switchMap(() =>
          this.apiService.get<CustomerCategoryRefundModel[]>('customer-category-refund').pipe(
            map((customerCategoryRefund) => {
              return eActions.getCustomerCategoryRefundComplete({ customerCategoryRefund });
            })
          )
        )
      )
  );

  onGetEventHistory = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getEventHistory),
        switchMap(() =>
          this.apiService.get<EventHistoryModel[]>('event-history').pipe(
            map((eventHistory) => {
              return eActions.getEventHistoryComplete({ eventHistory });
            })
          )
        )
      )
  );

  onGetDiscountType = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getDiscountType),
        switchMap(() =>
          this.apiService.get<DiscountTypeModel[]>('discount-type').pipe(
            map((discountType) => {
              return eActions.getDiscountTypeComplete({ discountType });
            })
          )
        )
      )
  );

  onGetPresents = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(eActions.getPresents),
        switchMap(() =>
          this.apiService.get<PresentsModel[]>('presents').pipe(
            map((presents) => {
              return eActions.getPresentsComplete({ presents });
            })
          )
        )
      )
  );
}
