import { Column } from '../../../models/column.model';

export interface Columns {
  id: Column<Columns>;
  operationDate: Column<Columns>;
  username: Column<Columns>;
  description: Column<Columns>;
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
  operationDate: {
    name: 'operationDate',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Tarix',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  username: {
    name: 'username',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Kim tərəfindən',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
  description: {
    name: 'description',
    searchValue: '',
    isSearchVisible: false,
    displayName: 'Məzmun',
    start: '',
    end: '',
    min: 0,
    max: 0,
  },
};
