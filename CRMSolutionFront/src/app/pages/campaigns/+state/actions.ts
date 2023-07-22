import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from 'src/app/shared/actionTypeGenerator';
import { CampaignListModel } from '../../../models/campaignList.model';
import { SalesCampaignModel } from '../../../models/salesCampaign.model';
import { InsuredTypesModel } from '../../../models/insuredTypes.model';
import { SeriesModel } from 'src/app/models/series.model';
import { CustomerCategoryModel } from 'src/app/models/customerCategory.model';
import { CustomerCategoryRefundModel } from 'src/app/models/customerCategoryRefund.model';
import { EventHistoryModel } from 'src/app/models/eventHistory.model';
import { DiscountTypeModel } from 'src/app/models/discountType.model';
import { PresentsModel } from 'src/app/models/presents.model';

const getCampaignList = createAction(httpActionTypeGenerator('CampaignList', 'GET').start);
const getCampaignListComplete = createAction(httpActionTypeGenerator('CampaignList', 'GET').complete, props<{ campaignList: CampaignListModel[] }>());
const getCampaignListError = createAction(httpActionTypeGenerator('CampaignList', 'GET').error);

const getSalesCampaign = createAction(httpActionTypeGenerator('SalesCampaign', 'GET').start);
const getSalesCampaignComplete = createAction(httpActionTypeGenerator('SalesCampaign', 'GET').complete, props<{ salesCampaign: SalesCampaignModel[] }>());
const getSalesCampaignError = createAction(httpActionTypeGenerator('SalesCampaign', 'GET').error);

const getInsuredTypes = createAction(httpActionTypeGenerator('InsuredTypes', 'GET').start);
const getInsuredTypesComplete = createAction(httpActionTypeGenerator('InsuredTypes', 'GET').complete, props<{ insuredTypes: InsuredTypesModel[] }>());
const getInsuredTypesError = createAction(httpActionTypeGenerator('InsuredTypes', 'GET').error);

const getSeries = createAction(httpActionTypeGenerator('Series', 'GET').start);
const getSeriesComplete = createAction(httpActionTypeGenerator('Series', 'GET').complete, props<{ series: SeriesModel[] }>());
const getSeriesError = createAction(httpActionTypeGenerator('Series', 'GET').error);

const getCustomerCategory = createAction(httpActionTypeGenerator('CustomerCategory', 'GET').start);
const getCustomerCategoryComplete = createAction(httpActionTypeGenerator('CustomerCategory', 'GET').complete, props<{ customerCategory: CustomerCategoryModel[] }>());
const getCustomerCategoryError = createAction(httpActionTypeGenerator('CustomerCategory', 'GET').error);

const getCustomerCategoryRefund = createAction(httpActionTypeGenerator('CustomerCategoryRefund', 'GET').start);
const getCustomerCategoryRefundComplete = createAction(httpActionTypeGenerator('CustomerCategoryRefund', 'GET').complete, props<{ customerCategoryRefund: CustomerCategoryRefundModel[] }>());
const getCustomerCategoryRefundError = createAction(httpActionTypeGenerator('CustomerCategoryRefund', 'GET').error);

const getEventHistory = createAction(httpActionTypeGenerator('EventHistory', 'GET').start);
const getEventHistoryComplete = createAction(httpActionTypeGenerator('EventHistory', 'GET').complete, props<{ eventHistory: EventHistoryModel[] }>());
const getEventHistoryError = createAction(httpActionTypeGenerator('EventHistory', 'GET').error);

const getDiscountType = createAction(httpActionTypeGenerator('DiscountType', 'GET').start);
const getDiscountTypeComplete = createAction(httpActionTypeGenerator('DiscountType', 'GET').complete, props<{ discountType: DiscountTypeModel[] }>());
const getDiscountTypeError = createAction(httpActionTypeGenerator('DiscountType', 'GET').error);

const getPresents = createAction(httpActionTypeGenerator('Presents', 'GET').start);
const getPresentsComplete = createAction(httpActionTypeGenerator('Presents', 'GET').complete, props<{ presents: PresentsModel[] }>());
const getPresentsError = createAction(httpActionTypeGenerator('Presents', 'GET').error);

const deleteCampaign = createAction(httpActionTypeGenerator('DeleteCampaign', 'DELETE').start);
const deleteCampaignComplete = createAction(httpActionTypeGenerator('DeleteCampaign', 'DELETE').complete, props<{ campaignId: any }>());
const deleteCampaignError = createAction(httpActionTypeGenerator('DeleteCampaign', 'DELETE').error);

export const Actions = {
  getCampaignList,
  getCampaignListComplete,
  getCampaignListError,
  getSalesCampaign,
  getSalesCampaignComplete,
  getSalesCampaignError,
  getInsuredTypes,
  getInsuredTypesComplete,
  getInsuredTypesError,
  getSeries,
  getSeriesComplete,
  getSeriesError,
  getCustomerCategory,
  getCustomerCategoryComplete,
  getCustomerCategoryError,
  getCustomerCategoryRefund,
  getCustomerCategoryRefundComplete,
  getCustomerCategoryRefundError,
  getEventHistory,
  getEventHistoryComplete,
  getEventHistoryError,
  getDiscountType,
  getDiscountTypeComplete,
  getDiscountTypeError,
  getPresents,
  getPresentsComplete,
  getPresentsError,
  deleteCampaign,
  deleteCampaignComplete,
  deleteCampaignError
};
