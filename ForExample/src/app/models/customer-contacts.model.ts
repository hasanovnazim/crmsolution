export interface CustomerContactsModel {
  id: number;
  fullName: string;
  clientId: string;
  email: string;
  position: string;
  insuredType: string;
  policySeries: string;
  phone: string;
  nameSurname: string;
  limit: number;
  offset: number;
}
export type CustomerEdit = Pick<
  CustomerContactsModel,
  'id' | 'email' | 'position' | 'policySeries' | 'nameSurname'
>;
export type CustomerAdd = Omit<
  CustomerContactsModel,
  'id' | 'fullName' | 'phone' | 'limit' | 'offset'
>;
