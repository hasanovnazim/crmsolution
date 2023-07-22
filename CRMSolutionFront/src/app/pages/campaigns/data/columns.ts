import { CampaignListModel } from "../../../models/campaignList.model";
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from "ng-zorro-antd/table";

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<CampaignListModel> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<CampaignListModel> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

export const columns: ColumnItem[] = [
  {
    name: "Kampaniya adı",
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) =>
      a.campaignName.localeCompare(b.campaignName),
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) =>
      list.some((a) => item.campaignName.indexOf(a) !== -1),
  },
  {
    name: "Sığorta növü",
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) =>
      a.promoCode.localeCompare(b.promoCode),
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) =>
      list.some((a) => item.promoCode.indexOf(a) !== -1),
  },
  {
    name: "Seriyalar",
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) =>
      a.policySeries.localeCompare(b.policySeries),
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) =>
      list.some((a) => item.policySeries.indexOf(a) !== -1),
  },
  // {
  //   name: 'Sığortalı növü',
  //   sortOrder: null,
  //   sortFn: (a: CampaignListModel, b: CampaignListModel) => a.CustomersCategory.localeCompare(b.CustomersCategory),
  //   sortDirections: ['ascend', 'descend', null],
  //   filterMultiple: true,
  //   listOfFilter: [],
  //   filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.CustomersCategory.indexOf(a) !== -1),
  // },
  // {
  //   name: 'Müştəri kateqoriyası',
  //   sortOrder: null,
  //   sortFn: (a: CampaignListModel, b: CampaignListModel) => a.SecondCustCat.localeCompare(b.SecondCustCat),
  //   sortDirections: ['ascend', 'descend', null],
  //   filterMultiple: true,
  //   listOfFilter: [],
  //   filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.SecondCustCat.indexOf(a) !== -1),
  // },
  // {
  //   name: 'Hadisə tarixçəsi',
  //   sortOrder: null,
  //   sortFn: (a: CampaignListModel, b: CampaignListModel) => a.EventHistory.localeCompare(b.EventHistory),
  //   sortDirections: ['ascend', 'descend', null],
  //   filterMultiple: true,
  //   listOfFilter: [],
  //   filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.EventHistory.indexOf(a) !== -1),
  // },
  {
    name: "Başlama tarixi",
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) =>
      a.startDate.localeCompare(b.startDate),
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) =>
      list.some((a) => item.startDate.indexOf(a) !== -1),
  },
  {
    name: "Bitmə tarixi",
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) =>
      a.endDate.localeCompare(b.endDate),
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) =>
      list.some((a) => item.endDate.indexOf(a) !== -1),
  },
  {
    name: "",
    sortOrder: null,
    sortFn: null,
    sortDirections: ["ascend", "descend", null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null,
  },
];
