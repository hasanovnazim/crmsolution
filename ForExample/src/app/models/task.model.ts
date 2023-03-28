export interface TaskModel {
  policyId: number;
  insureTypeId: number;
  taskNumber: string;
  taskId: number;
  taskStatus: string;
  taskDate: string;
  events: Event[];
  limit: number;
  offset: number;
  expand: boolean;
}
export interface Event {
  eventId: number;
  eventType: string;
  eventDescription: string;
  eventDate: Date;
  eventResponseDate: Date;
  eventResponse: string;
}

export interface TaskParams {
  taskId?: number;
  limit: number;
  offset: number;
}
export interface CreateTaskModel {
  cancellationId: number;
  subjectId: number;
  portfelId: number;
}
