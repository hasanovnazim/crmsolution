export interface CampaignListModel {
  campaignId: number;
  campaignName: string;
  description: string;
  policySeries: string;
  startDate: string;
  endDate: string;
  createUser: number;
  createDate: string;
  lastUpdateUser: string;
  lastUpdateDate: string;
  clientCategoryId: number;
  clientCategoryBelongCampaignId: number;
  choiseClaimHistoryId: number;
  minimumInsuranceAmount: number;
  promoCode: string;
  campaignType: number;
  discountType: number;
  status: number;
  insureTypeName: string;
}
export interface CampaingItem {
  prodId: number;
  insureTypeId: number;
  policySeries: string | string[];
  campaignName: string;
  startDate: string | Date;
  endDate: string | Date;
  description: string;
  clientCategoryId: number;
  clientCategoryBelongCampaignId: number;
  choiseClaimHistoryId: number;
  minimumInsuranceAmount: string;
  promoCode: string;
  campaignType: number;
  discountType: number;
  discountDetails: DiscountDetail[];
}

export interface DiscountDetail {
  discountDetailId: number;
  minInsuranceAmount: string;
  maxInsuranceAmount: string;
  discountType: number;
  discountAmount: string;
}
