import { Component, OnInit } from '@angular/core';
import { Facade } from './+state/facade';
import { UserModel } from '../../models/user.model';
import { ColumnItem, columns } from './data/columns';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-users',
  template: `
    <h2 nz-typography>Users</h2>
    <nz-table
      *ngIf="users.length"
      #usersTable
      [nzData]="users"
      nzTableLayout="fixed"
    >
      <thead>
        <tr>
          <th
            *ngFor="let column of columns"
            [nzSortOrder]="column.sortOrder"
            [nzSortFn]="column.sortFn"
            [nzSortDirections]="column.sortDirections"
            [nzFilterMultiple]="column.filterMultiple"
            [nzFilters]="column.listOfFilter"
            [nzFilterFn]="column.filterFn"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of usersTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.username }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.website }}</td>
        </tr>
      </tbody>
    </nz-table>
  `,
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  columns: ColumnItem[] = columns;
  constructor(private usersFacade: Facade) {}

  ngOnInit(): void {
    this.usersFacade.getUsers();
    this.usersFacade.users$.subscribe((v) => {
      this.users = v;
    });
  }
}
