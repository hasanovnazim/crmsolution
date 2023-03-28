import { Column } from '../../../models/column.model';

export interface Columns {
  policySeries: Column<Columns>;
  policyNumber: Column<Columns>;
  policyDate: Column<Columns>;
  branchCode: Column<Columns>;
  debt: Column<Columns>;
  errorMessage: Column<Columns>;
  dayCount: Column<Columns>;
  communicationTypeId: Column<Columns>;
  insuredName: Column<Columns>;
  insureTypeId: Column<Columns>;
  approveStatus: Column<Columns>;
  message: Column<Columns>;
  phone: Column<Columns>;
  email: Column<Columns>;
  hasProblem: Column<Columns>;
  fullPolicyNumber: Column<Columns>;
}

export const Columns: Columns = {
  policySeries: {
    name: 'policySeries',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'SŞ seriyası',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: false,
    isDropdown: true,
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
    hasNotFilter: true,
    isText: true,
  },
  fullPolicyNumber: {
    name: 'fullPolicyNumber',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'SŞ tam nömrəsi',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
    isText: true,
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
    hasNotFilter: true,
    isDate: true,
  },
  branchCode: {
    name: 'branchCode',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Ofis',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: false,
    isDropdown: true,
  },
  debt: {
    name: 'debt',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Borc',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
    isText: true,
  },
  errorMessage: {
    name: 'errorMessage',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Xəta mesajı',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
    isText: true,
  },
  dayCount: {
    name: 'dayCount',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Gün sayı',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
    isText: true,
  },
  communicationTypeId: {
    name: 'communicationTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Kommunikasiya növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: false,
    isDropdown: true,
  },
  insuredName: {
    name: 'insuredName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Siğortalı adı',
    start: '',
    end: '',
    min: 0,
    max: 0,
    isText: true,
  },
  insureTypeId: {
    name: 'insureTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Siğortalı növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: false,
    isDropdown: true,
  },
  approveStatus: {
    name: 'approveStatus',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Təsdiq statusu',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
  },
  message: {
    name: 'message',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Göndəriləcək mesaj',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
  },
  phone: {
    name: 'phone',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Göndəriləcək nömrə',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
  },
  email: {
    name: 'email',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Göndəriləcək email',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
  },
  hasProblem: {
    name: 'hasProblem',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Problemli',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: false,
    isDropdown: true,
  },
};