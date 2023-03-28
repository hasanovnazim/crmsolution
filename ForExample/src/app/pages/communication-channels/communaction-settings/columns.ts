import { Column } from '../../../models/column.model';

export interface Columns {
  policySeries: Column<Columns>;
  branchCode: Column<Columns>;
  communicationTypeId: Column<Columns>;
  dayCount: Column<Columns>;
  communicationText: Column<Columns>;
  messageTypeId: Column<Columns>;
}

export const Columns: Columns = {
  policySeries: {
    name: 'policySeries',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Sığorta növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
    isDropdown: true,
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
    isDropdown: true,
  },
  communicationTypeId: {
    name: 'communicationTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Məlumatlandırma növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
    isDropdown: true,
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
    isRange: true,
  },
  communicationText: {
    name: 'communicationText',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Mətnin məzmunu',
    start: '',
    end: '',
    min: 0,
    max: 0,
    hasNotFilter: true,
  },
  messageTypeId: {
    name: 'messageTypeId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Mətnin növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
    isDropdown: true,
  },
};
