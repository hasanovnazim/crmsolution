import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter, map, Observable, skip } from "rxjs";
import { Selectors } from "./selectors";
import { CampaignListModel } from "../../../models/campaignList.model";
import { SalesCampaignModel } from "../../../models/salesCampaign.model";
import { Actions } from "./actions";
import { InsuredTypesModel } from "src/app/models/insuredTypes.model";
import { SeriesModel } from "src/app/models/series.model";
import { CustomerCategoryModel } from "src/app/models/customerCategory.model";
import { CustomerCategoryRefundModel } from "src/app/models/customerCategoryRefund.model";
import { EventHistoryModel } from "src/app/models/eventHistory.model";
import { DiscountTypeModel } from "src/app/models/discountType.model";
import { PresentsModel } from "src/app/models/presents.model";
import { ApiService } from "src/app/store/api.service";
import { ResponsePayload } from "src/app/models/response.model";

@Injectable()
export class Facade {
  constructor(private store: Store<any>, private api: ApiService) {}

  campaignList$: Observable<CampaignListModel[]> = this.store.pipe(
    select(Selectors.campaignList),
    filter((v) => !!v)
  );
  salesCampaign$: Observable<SalesCampaignModel[]> = this.store.pipe(
    select(Selectors.salesCampaign),
    filter((v) => !!v)
  );
  insuredTypes$: Observable<InsuredTypesModel[]> = this.store.pipe(
    select(Selectors.insuredTypes),
    filter((v) => !!v)
  );
  series$: Observable<SeriesModel[]> = this.store.pipe(
    select(Selectors.series),
    filter((v) => !!v)
  );
  customerCategory$: Observable<CustomerCategoryModel[]> = this.store.pipe(
    select(Selectors.customerCategory),
    filter((v) => !!v)
  );
  customerCategoryRefund$: Observable<CustomerCategoryRefundModel[]> =
    this.store.pipe(
      select(Selectors.customerCategoryRefund),
      filter((v) => !!v)
    );
  eventHistory$: Observable<EventHistoryModel[]> = this.store.pipe(
    select(Selectors.eventHistory),
    filter((v) => !!v)
  );
  discountType$: Observable<DiscountTypeModel[]> = this.store.pipe(
    select(Selectors.discountType),
    filter((v) => !!v)
  );
  presents$: Observable<PresentsModel[]> = this.store.pipe(
    select(Selectors.presents),
    filter((v) => !!v)
  );
  deleteCampaign$: Observable<CampaignListModel[]> = this.store.pipe(
    select(Selectors.deleteCampaign),
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
  getSeries(insureType: string = ""): any {
    let param = "";
    if (insureType) param = `?types=${insureType}`;
    this.api
      .get<ResponsePayload<SeriesModel[]>>("List/policySeries" + param)
      .pipe(map((v) => v.data))
      .subscribe((series) =>
        this.store.dispatch(Actions.getSeriesComplete({ series }))
      );
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

  deleteCampaign(): void {
    this.store.dispatch(Actions.deleteCampaign());
  }
}
