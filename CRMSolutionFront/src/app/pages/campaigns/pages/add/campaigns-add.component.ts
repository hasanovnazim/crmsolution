import { Component, OnInit } from "@angular/core";

import { differenceInCalendarDays } from "date-fns";

import { Facade } from "../../+state/facade";

import { SalesCampaignModel } from "src/app/models/salesCampaign.model";
import { InsuredTypesModel } from "src/app/models/insuredTypes.model";
import { SeriesModel } from "src/app/models/series.model";
import { CustomerCategoryModel } from "src/app/models/customerCategory.model";
import { CustomerCategoryRefundModel } from "src/app/models/customerCategoryRefund.model";
import { EventHistoryModel } from "src/app/models/eventHistory.model";
import { DiscountTypeModel } from "src/app/models/discountType.model";
import { PresentsModel } from "src/app/models/presents.model";
import { map, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { CampaignsService } from "../../services/campaigns.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { NotificationService } from "../../../../shared/notification.service";
import { DiscountDetail } from "../../../../models/campaignList.model";
import { DisabledTimeFn } from "ng-zorro-antd/date-picker";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-campaigns-add",
  templateUrl: "./campaigns-add.component.html",
  styleUrls: ["./campaigns-add.component.scss"],
})
export class CampaignsAddComponent implements OnInit {
  salesCampaign$: Observable<SalesCampaignModel[]>;
  insuredTypes$: Observable<InsuredTypesModel[]>;
  series$: Observable<SeriesModel[]>;
  customerCategory$: Observable<CustomerCategoryModel[]>;
  customerCategoryRefund$: Observable<CustomerCategoryRefundModel[]>;
  eventHistory$: Observable<EventHistoryModel[]>;
  discountType$: Observable<DiscountTypeModel[]>;
  presents$: Observable<PresentsModel[]>;
  isEdit = false;
  isLoading = false;
  campaignReactiveForm: FormGroup;
  today = new Date();
  isActiveCampaign = false;

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;
  disabledEndDate = (current: Date): boolean =>
    differenceInCalendarDays(
      current,
      this.today > this.campaignReactiveForm.get("startDate")?.value
        ? this.today
        : this.campaignReactiveForm.get("startDate")?.value
    ) < 0;

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDateTime: DisabledTimeFn = (v) => {
    if (differenceInCalendarDays(v as Date, this.today) === 0) {
      const currentHour = this.today.getHours();
      const currentMinute = this.today.getMinutes();
      const disabledHours = this.range(0, currentHour);

      return {
        nzDisabledHours: () => disabledHours,
        nzDisabledMinutes: (h) =>
          disabledHours.indexOf(h) > 0
            ? this.range(0, 60)
            : h === currentHour
            ? this.range(0, currentMinute)
            : [],
        nzDisabledSeconds: () => [],
      };
    }
    return {
      nzDisabledHours: () => [],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };

  constructor(
    private campaigngsFacade: Facade,
    private campaignsService: CampaignsService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notificationsService: NotificationService
  ) {
    this.customerCategory$ = this.campaigngsFacade.customerCategory$;
    this.customerCategoryRefund$ =
      this.campaigngsFacade.customerCategoryRefund$;
    this.eventHistory$ = this.campaigngsFacade.eventHistory$;
    this.discountType$ = this.campaigngsFacade.discountType$;
    this.presents$ = this.campaigngsFacade.presents$;
    this.salesCampaign$ = this.campaigngsFacade.salesCampaign$;
    this.insuredTypes$ = this.campaigngsFacade.insuredTypes$;
    this.series$ = this.campaigngsFacade.series$;

    this.campaignReactiveForm = this.fb.group({
      campaignId: new FormControl(""),
      insureTypeId: new FormControl("", [Validators.required]),
      policySeries: new FormControl([], [Validators.required]),
      productName: new FormControl("", [Validators.required]),
      startDate: new FormControl(new Date(), [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required]),
      description: new FormControl(""),
      clientCategoryId: new FormControl("", [Validators.required]),
      clientCategoryBelongCampaignId: new FormControl("", [
        Validators.required,
      ]),
      choiseClaimHistoryId: new FormControl(null),
      minimumInsuranceAmount: new FormControl("", [Validators.required]),
      promoCode: new FormControl(""),
      campaignType: new FormControl(null),
      maximumDiscountLimit: new FormControl(null),
      discountType: new FormControl("null"),
      discountDetails: this.fb.array([]),
    });
  }

  get discountDetails(): FormArray {
    return this.campaignReactiveForm.get("discountDetails") as FormArray;
  }

  removeDiscountDetails(index: number) {
    this.discountDetails.removeAt(index);
  }

  addDiscountDetails(
    item: DiscountDetail = {
      discountDetailId: 0,
      minInsuranceAmount: "",
      maxInsuranceAmount: "",
      discountType: 10,
      discountAmount: "",
    }
  ) {
    this.discountDetails.push(
      this.fb.group({
        // discountDetailId: new FormControl("", [Validators.required]),
        minInsuranceAmount: new FormControl(item.minInsuranceAmount, [
          Validators.required,
        ]),
        maxInsuranceAmount: new FormControl(item.maxInsuranceAmount, [
          Validators.required,
        ]),
        discountType: new FormControl(
          this.campaignReactiveForm.get("discountType")?.value ||
            item.discountType,
          [Validators.required]
        ),
        discountAmount: new FormControl(item.discountAmount, [
          Validators.required,
        ]),
      })
    );
  }

  ngOnInit(): void {
    this.campaignReactiveForm
      .get("insureTypeId")
      ?.valueChanges.subscribe((v) => {
        this.getPolicySeries(v);
      });

    this.campaignReactiveForm
      .get("discountType")
      ?.valueChanges.subscribe((v) => {
        if (!!v && this.discountDetails.controls.length < 1) {
          this.addDiscountDetails();
        }
      });

    this.campaignReactiveForm.get("startDate")?.valueChanges.subscribe((v) => {
      if (
        differenceInCalendarDays(
          v,
          this.campaignReactiveForm.get("endDate")?.value
        ) > 0
      ) {
        this.campaignReactiveForm.patchValue({
          endDate: v,
        });
      }
    });

    this.campaignReactiveForm
      .get("maximumDiscountLimit")
      ?.valueChanges.subscribe((v) => {
        if (v > 90) {
          this.campaignReactiveForm.get("maximumDiscountLimit")?.setValue(90);
        }
      });
    this.activeRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((v) => {
        if (v && v.campaignId) {
          this.campaignsService
            .getCampaignByProductIdList(v.campaignId)
            .subscribe((campaign) => {
              this.getPolicySeries(campaign.insureTypeId);
              this.campaignReactiveForm.patchValue({
                ...campaign,
                productName: campaign.campaignName,
                policySeries: (campaign.policySeries as string).split(","),
                startDate: new Date(campaign.startDate),
                endDate: new Date(campaign.endDate),
              });
              if (campaign.discountDetails && campaign.discountDetails.length) {
                this.discountDetails.clear();
                campaign.discountDetails.forEach((v) => {
                  this.addDiscountDetails(v);
                });
              }
              this.campaignReactiveForm.get("productName")?.disable();
              this.campaignReactiveForm
                .get("minimumInsuranceAmount")
                ?.disable();
              this.campaignReactiveForm.get("description")?.disable();
              this.campaignReactiveForm.get("promoCode")?.disable();
              this.campaignReactiveForm.get("maximumDiscountLimit")?.disable();
              this.discountDetails.controls.forEach((v) => {
                v.get("minInsuranceAmount")?.disable();
                v.get("maxInsuranceAmount")?.disable();
                v.get("discountAmount")?.disable();
              });

              if (
                differenceInCalendarDays(
                  new Date(campaign.startDate.toString()),
                  this.today
                ) < 0
              ) {
                this.isActiveCampaign = true;
              }
            });

          this.isEdit = true;
        }
      });
    this.campaigngsFacade.getInsuredTypes();
    this.campaigngsFacade.getSeries();
  }

  onDateChange(result: Date[]): void {
    const startDate = result[0];
    const endDate = result[1];

    this.campaignReactiveForm.patchValue({
      startDate,
      endDate,
    });
  }

  submitCampaign() {
    if (this.campaignReactiveForm.valid) {
      this.isLoading = true;
      this.campaignsService
        .campaignOperation(this.campaignReactiveForm.value, this.isEdit)
        .subscribe({
          next: () => {
            this.notificationsService.show("success", "Əlavə edildi!");
            this.isLoading = false;
            setTimeout(() => this.router.navigate(["/campaigns"]), 1000);
          },
          error: (err) => {
            console.log(err);
            this.notificationsService.show("error", err.error.message);
            this.isLoading = false;
          },
        });
    }
  }

  getPolicySeries(event: any) {
    this.campaignReactiveForm.get("policySeries")?.setValue([]);
    this.campaigngsFacade.getSeries(event);
  }
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.id === o2.id : o1 === o2;

  discountMinChange(index: number, control: AbstractControl) {
    const minimumInsuranceAmount = this.campaignReactiveForm.get(
      "minimumInsuranceAmount"
    )!.value;

    const minValue = !index
      ? minimumInsuranceAmount
      : this.discountDetails.controls[index - 1].get("minInsuranceAmount")!
          .value + 1;

    if (Number(control.value) < Number(minValue)) {
      control.setErrors({ incorrect: true });
    } else {
      control.setErrors(null);
    }
  }

  discountMaxChange(index: number, control: AbstractControl) {
    const minInsuranceAmount =
      this.discountDetails.controls[index].get("minInsuranceAmount")!.value;
    if (Number(control.value) < Number(minInsuranceAmount) + 1) {
      control.setErrors({ incorrect: true });
    } else {
      control.setErrors(null);
    }
  }
}
