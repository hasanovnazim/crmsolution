import { UserModel } from '../../../models/user.model';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<UserModel> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<UserModel> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

export const columns: ColumnItem[] = [
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: UserModel, b: UserModel) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [
      { text: 'Clementina', value: 'Clementina' },
      { text: 'Leanne', value: 'Leanne' },
      { text: 'Nicholas', value: 'Nicholas' },
      { text: 'Patricia', value: 'Patricia' },
      { text: 'Chelsey', value: 'Chelsey' },
      { text: 'Kurtis', value: 'Kurtis' },
      { text: 'Glenna', value: 'Glenna' },
    ],
    filterFn: (list: string[], item: UserModel) =>
      list.some((name) => item.name.indexOf(name) !== -1),
  },
  {
    name: 'Username',
    sortOrder: null,
    sortFn: (a: UserModel, b: UserModel) =>
      a.username.localeCompare(b.username),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: UserModel) =>
      list.some((username) => item.username.indexOf(username) !== -1),
  },
  {
    name: 'Email',
    sortOrder: null,
    sortFn: (a: UserModel, b: UserModel) => a.email.localeCompare(b.email),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: UserModel) =>
      list.some((email) => item.email.indexOf(email) !== -1),
  },
  {
    name: 'Website',
    sortOrder: null,
    sortFn: (a: UserModel, b: UserModel) => a.website.localeCompare(b.website),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: UserModel) =>
      list.some((website) => item.website.indexOf(website) !== -1),
  },
];
