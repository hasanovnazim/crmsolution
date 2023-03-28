import { Component, OnInit, ViewChild } from '@angular/core';
import { Facade } from './+state/facade';
import { catchError, filter, Observable, throwError } from 'rxjs';
import {
  CustomerAdd,
  CustomerContactsModel,
  CustomerEdit,
} from '../../models/customer-contacts.model';
import { Columns } from './data/columns';
import { NotificationService } from '../../shared/notification.service';
import { InsuredType } from '../../models/insured-type.model';
import { PolicySeriesModel } from '../../models/policy-series.model';
import { NgForm } from '@angular/forms';
import { rolesList } from '../../store/auth/roles/rolesList';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss'],
})
export default class CustomerContactsComponent implements OnInit {
  customerContacts$: Observable<CustomerContactsModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  columns = Columns;
  isCommunicationDetailsVisible = false;
  isEditVisible = false;
  isEditLoading = false;
  isAddVisible = false;
  isAddLoading = false;
  editedContact: CustomerEdit = {
    id: 0,
    email: '',
    position: '',
    policySeries: '',
    nameSurname: '',
  };
  addContact: CustomerAdd = {
    clientId: '',
    insuredType: '',
    email: '',
    position: '',
    nameSurname: '',
    policySeries: '',
  };
  communicationDetails: any[] = [];
  insuredTypes$: Observable<InsuredType[]>;
  params$: Observable<Partial<CustomerContactsModel>>;
  policySeries$: Observable<PolicySeriesModel[]>;
  @ViewChild('addContactForm') addContactForm!: NgForm;
  @ViewChild('editContactForm') editContactForm!: NgForm;
  rolesList = rolesList;
  constructor(
    private facade: Facade,
    private notification: NotificationService
  ) {
    this.customerContacts$ = this.facade.customerContacts$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.insuredTypes$ = this.facade.getInsuredTypes();
    this.params$ = this.facade.params$;
    this.policySeries$ = this.facade.getPolicySeries();
  }

  ngOnInit() {
    this.facade.getCustomerContacts();
  }
  toggleCommunicationDetailsVisible(contact?: CustomerContactsModel) {
    if (contact) {
      const policySeries = contact.policySeries;

      this.facade.getCommunicationDetails(policySeries).subscribe((v) => {
        this.communicationDetails = v.data.result;
      });
    }

    this.isCommunicationDetailsVisible = !this.isCommunicationDetailsVisible;
  }

  resetFilter(key: keyof Columns): void {
    this.columns[key].searchValue = '';
    this.columns[key].min = 0;
    this.columns[key].max = 0;
    this.columns[key].start = '';
    this.columns[key].end = '';
  }

  search(key: string): void {
    const searchParam = (this.columns as any)[key];
    searchParam.isSearchVisible = false;
    if (key === 'insuredType') {
      const insuredTypesEnum = {
        p: 1,
        c: 2,
      };

      this.facade.changeParams(
        'insuredType',
        // @ts-ignore
        insuredTypesEnum[searchParam.searchValue]
      );
      return;
    }
    this.facade.changeParams(key, searchParam.searchValue);
  }

  pageChange(page: number) {
    this.facade.changePage(page);
  }
  pageSizeChange(size: number) {
    this.facade.changeParams('limit', size);
  }
  showEdit(contact: CustomerContactsModel) {
    this.editedContact.id = contact.id;
    this.editedContact.position = contact.position;
    this.editedContact.policySeries = contact.policySeries;
    this.editedContact.nameSurname = contact.nameSurname;
    this.editedContact.email = contact.email;
    this.isEditVisible = true;
  }
  showAdd() {
    this.isAddVisible = true;
  }
  closeEdit() {
    this.isEditVisible = false;
    this.isEditLoading = false;
    this.editedContact.nameSurname = '';
    this.editedContact.email = '';
    this.editedContact.id = 0;
    this.editedContact.position = '';
    this.editedContact.policySeries = '';
  }
  closeAdd() {
    this.isAddVisible = false;
    this.isAddLoading = false;
    this.addContact.nameSurname = '';
    this.addContact.email = '';
    this.addContact.position = '';
    this.addContact.policySeries = '';
    this.addContact.clientId = '';
    this.addContact.insuredType = '';
  }

  submitEdit() {
    this.isEditLoading = true;
    this.facade.editContact(this.editedContact).subscribe({
      next: (v) => {
        this.closeEdit();
        this.notification.show('success', v.message);
        this.facade.getCustomerContacts();
      },
      error: (err) => {
        this.isEditLoading = false;
      },
    });
  }
  submitAdd() {
    this.isAddLoading = true;
    this.facade.addContact(this.addContact).subscribe({
      next: (v) => {
        this.closeAdd();
        this.notification.show('success', v.message);
        this.facade.getCustomerContacts();
      },
      error: (err) => {
        this.isAddLoading = false;
      },
    });
  }
  downloadReport(): Observable<string> {
    return this.facade.downloadReport();
  }
}
