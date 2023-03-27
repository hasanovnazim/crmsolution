import { Component, OnInit } from '@angular/core';
import { Facade } from '../../+state/facade';
import { CampaignListModel } from '../../../../models/campaignList.model';
import { ColumnItem, columns } from '../../data/columns';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  campaignList: CampaignListModel[] = [];
  columns: ColumnItem[] = columns;
  isVisible = false;
  constructor(private campaignListFacade: Facade) {}

  ngOnInit(): void {
    this.campaignListFacade.getCampaignList();
    this.campaignListFacade.campaignList$.subscribe((v) => {
      this.campaignList = v;
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
