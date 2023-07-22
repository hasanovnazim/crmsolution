import { Component, OnInit } from "@angular/core";
import { Facade } from "../../+state/facade";
import { CampaignListModel } from "../../../../models/campaignList.model";
import { UntilDestroy } from "@ngneat/until-destroy";
import { CampaignsService } from "../../services/campaigns.service";
import { Observable } from "rxjs";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "app-campaigns",
  templateUrl: "./campaigns.component.html",
  styleUrls: ["./campaigns.component.scss"],
})
export class CampaignsComponent implements OnInit {
  isVisible = false;
  campaignList$: Observable<CampaignListModel[]>;

  constructor(
    private campaignListFacade: Facade,
    private campaignsService: CampaignsService
  ) {
    this.campaignList$ = this.campaignListFacade.campaignList$;
  }

  ngOnInit(): void {
    this.campaignListFacade.getCampaignList();
  }

  copy(data: CampaignListModel) {
    const payload = {
      ...data,
      policySeries: data.policySeries.split(","),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    this.campaignsService.campaignOperation(payload, false).subscribe();
  }
  removeCampaign(item: number) {
    this.campaignsService.deleteCampaigns(item).subscribe(() => {
      this.campaignListFacade.getCampaignList();
    });
  }
}
