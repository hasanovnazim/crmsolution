export type Role =
  | 'CANCELLATION_GET'
  | 'CANCELLATION_REPORT_GET'
  | 'CANCELLATION_INCREASE_POST'
  | 'CANCELLATION_APPROVE_POST'
  | 'CANCELLATION_INCREASE_BYPIVOT_POST'
  | 'COMMENTS_GET'
  | 'COMMENTS_POST'
  | 'COMMUNICATIONSETTINGS_GET'
  | 'COMMUNICATIONSETTINGS_POST'
  | 'COMMUNICATIONSETTINGS_DELETE'
  | 'COMMUNICATIONSETTINGS_PUT'
  | 'CONTACTS_GET'
  | 'CONTACTS_REPORT_GET'
  | 'CONTACTS_POST'
  | 'CONTACTS_EXCELL_POST'
  | 'CONTACTS_DELETE'
  | 'CONTACTS_PUT'
  // | 'DEBITORDETAILS_GET'
  // | 'DEBITORDETAILS_REPORT_GET'
  // | 'DEBITORDETAILS_INVOICE_GET'
  // | 'DEBITORS_GET'
  // | 'DEBITORS_REPORT_GET'
  | 'NOTIFICATIONHISTORY_GET'
  | 'NOTIFICATIONHISTORY_REPORT_GET'
  | 'NOTIFICATIONHISTORY_ENVELOPE_GET'
  | 'OPERATIONHISTORY_GET'
  | 'OPERATIONHISTORY_REPORT_GET'
  | 'SMSCHECKLIST_GET'
  | 'SMSCHECKLIST_CANCELL_POST'
  | 'SMSCHECKLIST_APPROVEALL_POST'
  | 'SMSCHECKLIST_STATUSLIST_GET'
  | 'SMSTIME_GET'
  | 'SMSTIME_POST'
  | 'SMSTIME_PUT'
  | 'SMSTIME_DELETE'
  | 'TASK_GET'
  | 'TASK_POST'
  // | 'DEBITOR_OPERATOR';

export const rolesList: { [key in Role]: Role } = {
  CANCELLATION_GET: 'CANCELLATION_GET',
  CANCELLATION_REPORT_GET: 'CANCELLATION_REPORT_GET',
  CANCELLATION_INCREASE_POST: 'CANCELLATION_INCREASE_POST',
  CANCELLATION_APPROVE_POST: 'CANCELLATION_APPROVE_POST',
  CANCELLATION_INCREASE_BYPIVOT_POST: 'CANCELLATION_INCREASE_BYPIVOT_POST',
  COMMENTS_GET: 'COMMENTS_GET',
  COMMENTS_POST: 'COMMENTS_POST',
  COMMUNICATIONSETTINGS_GET: 'COMMUNICATIONSETTINGS_GET',
  COMMUNICATIONSETTINGS_POST: 'COMMUNICATIONSETTINGS_POST',
  COMMUNICATIONSETTINGS_DELETE: 'COMMUNICATIONSETTINGS_DELETE',
  COMMUNICATIONSETTINGS_PUT: 'COMMUNICATIONSETTINGS_PUT',
  CONTACTS_GET: 'CONTACTS_GET',
  CONTACTS_REPORT_GET: 'CONTACTS_REPORT_GET',
  CONTACTS_POST: 'CONTACTS_POST',
  CONTACTS_EXCELL_POST: 'CONTACTS_EXCELL_POST',
  CONTACTS_DELETE: 'CONTACTS_DELETE',
  CONTACTS_PUT: 'CONTACTS_PUT',
  // DEBITORDETAILS_GET: 'DEBITORDETAILS_GET',
  //  DEBITORDETAILS_REPORT_GET: 'DEBITORDETAILS_REPORT_GET',
  // DEBITORDETAILS_INVOICE_GET: 'DEBITORDETAILS_INVOICE_GET',
  // DEBITORS_GET: 'DEBITORS_GET',
  // DEBITORS_REPORT_GET: 'DEBITORS_REPORT_GET',
  NOTIFICATIONHISTORY_GET: 'NOTIFICATIONHISTORY_GET',
  NOTIFICATIONHISTORY_REPORT_GET: 'NOTIFICATIONHISTORY_REPORT_GET',
  NOTIFICATIONHISTORY_ENVELOPE_GET: 'NOTIFICATIONHISTORY_ENVELOPE_GET',
  OPERATIONHISTORY_GET: 'OPERATIONHISTORY_GET',
  OPERATIONHISTORY_REPORT_GET: 'OPERATIONHISTORY_REPORT_GET',
  SMSCHECKLIST_GET: 'SMSCHECKLIST_GET',
  SMSCHECKLIST_CANCELL_POST: 'SMSCHECKLIST_CANCELL_POST',
  SMSCHECKLIST_APPROVEALL_POST: 'SMSCHECKLIST_APPROVEALL_POST',
  SMSCHECKLIST_STATUSLIST_GET: 'SMSCHECKLIST_STATUSLIST_GET',
  SMSTIME_GET: 'SMSTIME_GET',
  SMSTIME_POST: 'SMSTIME_POST',
  SMSTIME_PUT: 'SMSTIME_PUT',
  SMSTIME_DELETE: 'SMSTIME_DELETE',
  TASK_GET: 'TASK_GET',
  TASK_POST: 'TASK_POST',
  // DEBITOR_OPERATOR: 'DEBITOR_OPERATOR',
};
