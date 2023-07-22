import { CustomerCategoryModel } from "src/app/models/customerCategory.model";
import { CustomerCategoryRefundModel } from "src/app/models/customerCategoryRefund.model";
import { DiscountTypeModel } from "src/app/models/discountType.model";
import { EventHistoryModel } from "src/app/models/eventHistory.model";
import { InsuredTypesModel } from "src/app/models/insuredTypes.model";
import { PresentsModel } from "src/app/models/presents.model";
import { SeriesModel } from "src/app/models/series.model";
import { CampaignListModel } from "../../../models/campaignList.model";
import { SalesCampaignModel } from "../../../models/salesCampaign.model";
import {
  customerCategory,
  customerCategoryRefund,
  eventHistory,
  discountType,
  presents,
  salesCampaign,
} from "./static-data";

export interface State {
  loading: boolean;
  campaignList: CampaignListModel[];
  salesCampaign: SalesCampaignModel[];
  insuredTypes: InsuredTypesModel[];
  series: SeriesModel[];
  campaignId: CampaignListModel[];
  customerCategory: CustomerCategoryModel[];
  customerCategoryRefund: CustomerCategoryRefundModel[];
  eventHistory: EventHistoryModel[];
  discountType: DiscountTypeModel[];
  presents: PresentsModel[];
  error: any;
}

export const initialState: State = {
  loading: true,
  campaignList: [],
  salesCampaign,
  insuredTypes: [],
  series: [],
  campaignId: [],
  customerCategory,
  customerCategoryRefund,
  eventHistory,
  discountType,
  presents,
  error: null,
};
