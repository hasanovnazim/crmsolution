export interface DebitorDetails {
  policyId: number;
  policyDate: string;
  insureTypeId: number;
  insuredId: number;
  insuredType: 'c' | 'p';
  policySeries: string;
  responsiblePerson: string;
  policyNumber: string;
  lastClaimNumber: string;
  lastClaimDate: string;
  lastClaimDecision: string;
  lastClaimDecisionId: number;
  lastCommunicationDate: string;
  communicationTypeId: number;
  communicationTypeName: string;
  protechUrl: string;
  clientNameSurname: string;
  clientEmail: string;
  clientPhone: string;
  clientPosition: string;
  lastComment: string;
  lastCommentDate: string;
  debtInfo: DebtInfo[];
  expand: boolean;
}
export interface DebtInfo {
  payStartDate: string;
  hasDebt: boolean;
  payEndDate: string;
  paySum: number;
  paid: number;
  debt: number;
  expireDayCount: number;
  estimatedCancelDate: string;
  isInstall: boolean;
  installId: number;
  addId: number;
  invoiceNumber: number;
  debtPivot: string;
  invoiceId: number;
}
