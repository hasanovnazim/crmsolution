export interface CancellationModel {
  id: number;
  policyId: number;
  policySeries: string;
  policyNumber: string;
  policyDate: string;
  branchCode: string;
  branchName: string;
  insureTypeId: number;
  debt: number;
  dayCount: number;
  debitorDate: string;
  insuredId: number;
  insuredName: string;
  insuredType: 'c' | 'p';
  approveStatus: number;
  approveStatusName: string;
  note: string;
  hasTask: boolean;
  taskId: number;
  limit: number;
  offset: number;
}

export interface CancellationIncrease {
  debitorWillCancelledId: number;
  dayCount: number;
  note: string;
}
export interface CancellationApprove {
  cancellationId: number;
  note: string;
}
