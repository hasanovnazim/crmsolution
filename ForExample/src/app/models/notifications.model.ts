import { InsuredTypeEnum } from '../pages/debitor/data/insuredType.enum';

export interface NotificationsModel {
  id: number;
  address: string;
  policyId: number;
  insureTypeId: number;
  insuredType: InsuredTypeEnum;
  insuredId: number;
  insuredName: string;
  communicationTypeId: number;
  communicationTypeName: string;
  notificationDate: string;
  message: string;
  policySeries: string;
  policyNumber: string;
  policyDate: string;
  limit: number;
  offset: number;
}

export interface Envelope {
  policyList: PolicyList[];
  envelopeNumber: number;
  messageType: number;
}

export interface PolicyList {
  policyId: number;
  insureTypeId: number;
}

export interface CommunicationSettings {
  id: number;
  policySeries: string;
  branchCode: string;
  branchName: string;
  communicationTypeId: number;
  communicationTypeName: string;
  dayCount: number;
  communicationText: string;
  messageTypeId: number;
  messageTypeName: string;
  limit: number;
  offset: number;
}
