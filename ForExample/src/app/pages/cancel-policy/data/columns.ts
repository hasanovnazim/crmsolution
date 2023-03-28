import { Column } from '../../../models/column.model';

export interface Columns {
  id: Column<Columns>;
  policyId: Column<Columns>;
  policySeries: Column<Columns>;
  policyNumber: Column<Columns>;
  policyDate: Column<Columns>;
  branchCode: Column<Columns>;
  branchName: Column<Columns>;
  insureTypeId: Column<Columns>;
  debt: Column<Columns>;
  dayCount: Column<Columns>;
  debitorDate: Column<Columns>;
  insuredId: Column<Columns>;
  insuredName: Column<Columns>;
  insuredType: Column<Columns>;
  approveStatus: Column<Columns>;
  approveStatusName: Column<Columns>;
  note: Column<Columns>;
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
    displayName: 'Siğorta növü',
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
  debitorDate: {
    name: 'debitorDate',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  branchCode: {
    name: 'branchCode',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  branchName: {
    name: 'branchName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  debt: {
    name: 'debt',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'V/K qaliq',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  dayCount: {
    name: 'dayCount',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  approveStatus: {
    name: 'approveStatus',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  approveStatusName: {
    name: 'approveStatusName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam statusu',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  note: {
    name: 'note',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xitam tarixi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
};
