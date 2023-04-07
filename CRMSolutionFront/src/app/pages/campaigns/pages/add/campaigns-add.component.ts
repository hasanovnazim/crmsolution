import { Component, OnInit, ViewChild } from "@angular/core";

import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";

import { Facade } from "../../+state/facade";

import { SalesCampaignModel } from "src/app/models/salesCampaign.model";
import { InsuredTypesModel } from "src/app/models/insuredTypes.model";
import { SeriesModel } from "src/app/models/series.model";
import { CustomerCategoryModel } from "src/app/models/customerCategory.model";
import { CustomerCategoryRefundModel } from "src/app/models/customerCategoryRefund.model";
import { EventHistoryModel } from "src/app/models/eventHistory.model";
import { DiscountTypeModel } from "src/app/models/discountType.model";
import { PresentsModel } from "src/app/models/presents.model";
import { DiscountFirstModel } from 'src/app/models/discountFirst.model';
import { DiscountSecondModel } from 'src/app/models/discountSecond.model';

@Component({
  selector: "app-campaigns-add",
  templateUrl: "./campaigns-add.component.html",
  styleUrls: ["./campaigns-add.component.scss"],
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
  discountFirst: DiscountFirstModel[] = [];
  discountSecond: DiscountSecondModel[] = [];

  insuredTypesModel: any;
  salesCampaignModel: any;
  seriesModel: any;
  customerCategoryModel: any;
  customerCategoryRefundModel: any;
  eventHistoryModel: any;
  discountTypeModel: any;
  presentsModel: any;
  discountFirstModel: any;
  discountSecondModel: any;

  constructor(
    private salesCapaignFacede: Facade,
    private insuredTypesFacede: Facade,
    private seriesFacede: Facade,
    private customerCategoryFacede: Facade,
    private customerCategoryRefundFacede: Facade,
    private eventHistoryFacede: Facade,
    private discountTypeFacede: Facade,
    private presentsFacede: Facade
  ) {}

  ngOnInit(): void {
    // this.salesCapaignFacede.getSalesCampaign();
    // this.salesCapaignFacede.salesCampaign$.subscribe((v) => {
    //   this.salesCampaign = v;
    // });

    this.insuredTypesFacede.getInsuredTypes();
    this.insuredTypesFacede.insuredTypes$.subscribe((v: any) => {
      this.insuredTypes = v.data;
    });

    this.seriesFacede.getSeries().subscribe((v:any) => {
      this.series = v;
    });
    // this.seriesFacede.series$.subscribe((v: any) => {
    //   this.series = v.data;
    // });

    // this.customerCategoryFacede.getCustomerCategory();
    // this.customerCategoryFacede.customerCategory$.subscribe((v:any) => {
    //   this.customerCategory = v.data;
    // });

    // this.customerCategoryRefundFacede.getCustomerCategoryRefund();
    // this.customerCategoryRefundFacede.customerCategoryRefund$.subscribe((v) => {
    //   this.customerCategoryRefund = v;
    // });

    // this.eventHistoryFacede.getEventHistory();
    // this.eventHistoryFacede.eventHistory$.subscribe((v) => {
    //   this.eventHistory = v;
    // });

    // this.discountTypeFacede.getDiscountType();
    // this.discountTypeFacede.discountType$.subscribe((v) => {
    //   this.discountType = v;
    // });

    // this.presentsFacede.getPresents();
    // this.presentsFacede.presents$.subscribe((v) => {
    //   this.presents = v;
    // });
  }

  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild("endDatePicker") endDatePicker!: NzDatePickerComponent;

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
    console.log("handleStartOpenChange", open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log("handleEndOpenChange", open);
  }

  changeDiscount(e?: MouseEvent): void {
    console.log("change discount");
    this.discountFirst = [];
    this.discountSecond = [];
  }

  changeMinSigorta(e?: number): void {
    this.minSigorta = e || null;
  }

  minSigorta: number | null = null;
  key: string = '';

  changeDiscountFirst(e: Event): any {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const id = parseInt(target.id);
    this.discountFirst[id][name as keyof DiscountFirstModel] = parseInt(target.value)
  }
  changeDiscountSecond(e: Event): any {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const id = parseInt(target.id);
    this.discountSecond[id][name as keyof DiscountSecondModel] = parseInt(target.value)
  }

  addDiscountFirst(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.discountFirst.length > 0 ? this.discountFirst[this.discountFirst.length - 1].id + 1 : 0;

    let minVal = 0;

    if(id === 0) {
      minVal = this.minSigorta || 0
    } else {
      minVal = this.discountFirst[id - 1].maxValue;
    }
    const control = {
      id,
      minValue: minVal,
      maxValue: 0,
      discount: 0
    };

    this.discountFirst.push(control);
    console.log("discountFirst", this.discountFirst);
  }

  removeDiscountFirst(i: { id: number, minValue: number, maxValue: number, discount: number }, e: MouseEvent): void {
    e.preventDefault();
    if (this.discountFirst.length > 1) {
      const index = this.discountFirst.indexOf(i);
      this.discountFirst.splice(index, 1);
      console.log(this.discountFirst);
    }
  }

  addDiscountSecond(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.discountSecond.length > 0 ? this.discountSecond[this.discountSecond.length - 1].id + 1 : 0;

    let minVal = 0;

    if(id === 0) {
      minVal = this.minSigorta || 0
    } else {
      minVal = this.discountSecond[id - 1].maxValue;
    }

    const control = {
      id,
      minValue: minVal,
      maxValue: 0,
      discount: 0
    };
    this.discountSecond.push(control);
    console.log("discountSecond", this.discountSecond);
  }

  removeDiscountSecond(i: { id: number, minValue: number, maxValue: number, discount: number }, e: MouseEvent): void {
    e.preventDefault();
    if (this.discountSecond.length > 1) {
      const index = this.discountSecond.indexOf(i);
      this.discountSecond.splice(index, 1);
      console.log(this.discountSecond);
    }
  }
  getPolicySeries(event: any) {
    this.seriesFacede.getSeries(event).subscribe((v: any) => {
      debugger
      this.series = v;
    });
  }
}
