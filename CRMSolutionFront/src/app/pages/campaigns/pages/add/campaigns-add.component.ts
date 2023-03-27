import { Component, OnInit, ViewChild } from '@angular/core';

import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import { Facade } from '../../+state/facade';

import { SalesCampaignModel } from 'src/app/models/salesCampaign.model';
import { InsuredTypesModel } from 'src/app/models/insuredTypes.model';
import { SeriesModel } from 'src/app/models/series.model';
import { CustomerCategoryModel } from 'src/app/models/customerCategory.model';
import { CustomerCategoryRefundModel } from 'src/app/models/customerCategoryRefund.model';
import { EventHistoryModel } from 'src/app/models/eventHistory.model';
import { DiscountTypeModel } from 'src/app/models/discountType.model';
import { PresentsModel } from 'src/app/models/presents.model';

@Component({
  selector: 'app-campaigns-add',
  templateUrl: './campaigns-add.component.html',
  styleUrls: ['./campaigns-add.component.scss']
})
export class CampaignsAddComponent implements OnInit {

  salesCampaign: SalesCampaignModel[] = [];
  insuredTypes: InsuredTypesModel[] = [];
  series: SeriesModel[] = [];
  customerCategory: CustomerCategoryModel[] = [];
  customerCategoryRefund: CustomerCategoryRefundModel[] = [];
  eventHistory: EventHistoryModel[] = [];
  discountType: DiscountTypeModel[] = [];
  presents: PresentsModel[] = [];

  insuredTypesModel: any;
  salesCampaignModel: any;
  seriesModel: any;
  customerCategoryModel: any;
  customerCategoryRefundModel: any;
  eventHistoryModel: any;
  discountTypeModel: any;
  presentsModel: any;

  constructor(
    private salesCapaignFacede: Facade, 
    private insuredTypesFacede: Facade, 
    private seriesFacede: Facade,
    private customerCategoryFacede: Facade,
    private customerCategoryRefundFacede: Facade,
    private eventHistoryFacede: Facade,
    private discountTypeFacede: Facade,
    private presentsFacede: Facade,
  ) {}

  ngOnInit(): void {
    this.salesCapaignFacede.getSalesCampaign();
    this.salesCapaignFacede.salesCampaign$.subscribe((v) => {
      this.salesCampaign = v;
    });

    this.insuredTypesFacede.getInsuredTypes();
    this.insuredTypesFacede.insuredTypes$.subscribe((v) => {
      this.insuredTypes = v;
    });

    this.seriesFacede.getSeries();
    this.seriesFacede.series$.subscribe((v) => {
      this.series = v;
    });

    this.customerCategoryFacede.getCustomerCategory();
    this.customerCategoryFacede.customerCategory$.subscribe((v) => {
      this.customerCategory = v;
    });

    this.customerCategoryRefundFacede.getCustomerCategoryRefund();
    this.customerCategoryRefundFacede.customerCategoryRefund$.subscribe((v) => {
      this.customerCategoryRefund = v;
    });

    this.eventHistoryFacede.getEventHistory();
    this.eventHistoryFacede.eventHistory$.subscribe((v) => {
      this.eventHistory = v;
    });

    this.discountTypeFacede.getDiscountType();
    this.discountTypeFacede.discountType$.subscribe((v) => {
      this.discountType = v;
    });

    this.presentsFacede.getPresents();
    this.presentsFacede.presents$.subscribe((v) => {
      this.presents = v;
    });
  }

  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    this.listOfControl.push(control);
    console.log("listOfControl", this.listOfControl);
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
    }
  }
}
