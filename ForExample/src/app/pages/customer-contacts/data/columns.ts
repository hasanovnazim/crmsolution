import { Column } from '../../../models/column.model';

export interface Columns {
  id: Column<Columns>;
  fullName: Column<Columns>;
  clientId: Column<Columns>;
  email: Column<Columns>;
  position: Column<Columns>;
  insuredType: Column<Columns>;
  policySeries: Column<Columns>;
  phone: Column<Columns>;
  nameSurname: Column<Columns>;
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
  fullName: {
    name: 'fullName',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Sığortalı',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  clientId: {
    name: 'clientId',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'clientId',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  email: {
    name: 'email',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Müştərinin e-poçtu',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  position: {
    name: 'position',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Müştərinin vəzifəsi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  insuredType: {
    name: 'insuredType',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Sığorta növü',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  policySeries: {
    name: 'policySeries',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Sığorta seriyası',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  phone: {
    name: 'phone',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Müştərinin əlaqə nömrəsi',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  nameSurname: {
    name: 'nameSurname',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Müştərinin adı, soyadı',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
};
