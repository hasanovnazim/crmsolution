import { Injectable } from "@angular/core";
import { ApiService } from "../../../store/api.service";
import { map, Observable } from "rxjs";
import { List, ResponsePayload } from "../../../models/response.model";
import {
  CampaignListModel,
  CampaingItem,
} from "../../../models/campaignList.model";

@Injectable({
  providedIn: "root",
})
export class CampaignsService {
  constructor(private api: ApiService) {}

  deleteCampaigns(campaignId: number): Observable<any> {
    return this.api.delete<ResponsePayload<List<CampaignListModel>>>(
      `/Campaign/delete/${campaignId}`
    );
  }

  campaignOperation(data: any, isEdit: boolean): Observable<any> {
    if (isEdit) {
      return this.editCampaign(data);
    } else {
      return this.createCampaign(data);
    }
  }

  createCampaign(data: any): Observable<any> {
    const discountDetails = data.discountDetails.length
      ? data.discountDetails
      : null;
    const discountType =
      data.discountType === "null" ? null : data.discountType;
    const campaignType =
      data.campaignType === "null" ? null : data.campaignType;
    const payload = {
      ...data,
      policySeries: data.policySeries.join(","),
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      discountType,
      discountDetails,
      campaignType,
    };
    delete payload.campaignId;
    return this.api.post<any[]>("Campaign/insert", payload);
  }

  editCampaign(data: any): Observable<any> {
    const payload = {
      campaignId: data.campaignId,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };
    return this.api.put<any[]>("Campaign/update", payload);
  }

  getCampaignByProductIdList(id: number): Observable<CampaingItem> {
    return this.api
      .get<ResponsePayload<CampaingItem>>(
        "Campaign/getCampaignByProductId?productId=" + id
      )
      .pipe(map((v) => v.data));
  }
}
