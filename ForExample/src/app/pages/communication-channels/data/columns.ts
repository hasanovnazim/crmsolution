import { Column } from '../../../models/column.model';

export interface Columns {
  id: Column<Columns>;
  policyId: Column<Columns>;
  address: Column<Columns>;
  insureTypeId: Column<Columns>;
  insuredType: Column<Columns>;
  insuredId: Column<Columns>;
  insuredName: Column<Columns>;
  communicationTypeId: Column<Columns>;
  communicationTypeName: Column<Columns>;
  notificationDate: Column<Columns>;
  message: Column<Columns>;
  policySeries: Column<Columns>;
  policyNumber: Column<Columns>;
  policyDate: Column<Columns>;
}

export const Columns: Columns = {
  id: {
    name: 'id',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'id',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  policyId: {
    name: 'policyId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'policyId',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  address: {
    name: 'address',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Ünvan',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  insureTypeId: {
    name: 'insureTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'insureTypeId',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  insuredType: {
    name: 'insuredType',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'insuredType',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  insuredId: {
    name: 'insuredId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'insuredId',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  insuredName: {
    name: 'insuredName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Siğortalının adı',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  communicationTypeId: {
    name: 'communicationTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'communicationTypeId',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  communicationTypeName: {
    name: 'communicationTypeName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Kommunikasiya tipinin adı',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  notificationDate: {
    name: 'notificationDate',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xəbərdarlığın göndərildiyi tarix',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  message: {
    name: 'message',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xəbərdarlıq mesajı',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  policySeries: {
    name: 'policySeries',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'SŞ seriyası',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  policyNumber: {
    name: 'policyNumber',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'SŞ nömrəsi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  policyDate: {
    name: 'policyDate',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'SŞ tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
};
