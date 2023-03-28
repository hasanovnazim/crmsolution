export interface DebitorCommentsModel {
  id: number;
  policyId: number;
  insureTypeId: number;
  userId: number;
  username: string;
  comment: string;
  commentDate: Date;
}

export interface AddComment {
  policyId: number;
  insureTypeId: number;
  comment: string;
}
