export interface SmsCheckListModel {
  id: number;
  policyId: number;
  policySeries: string;
  policyNumber: string;
  policyDate: string;
  branchCode: string;
  insureTypeId: number;
  debt: number;
  errorMessage: string;
  dayCount: number;
  debitorDate: string;
  communicationTypeId: number;
  insuredId: number;
  insuredName: string;
  insuredType: string;
  approveStatus: number;
  sent: boolean;
  message: string;
  phone: string;
  email: string;
  hasProblem: 'false' | 'true';
  fullPolicyNumber: string;
  protechUrl: string;
  limit: number;
  offset: number;
}
