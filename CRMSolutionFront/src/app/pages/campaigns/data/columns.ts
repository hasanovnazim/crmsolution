import { CampaignListModel } from '../../../models/campaignList.model';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

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
    name: 'Kampaniya adı',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.CampaignName.localeCompare(b.CampaignName),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.CampaignName.indexOf(a) !== -1),
  },
  {
    name: 'Sığorta növü',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.InsuranceType.localeCompare(b.InsuranceType),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.InsuranceType.indexOf(a) !== -1),
  },
  {
    name: 'Seriyalar',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.Series.localeCompare(b.Series),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.Series.indexOf(a) !== -1),
  },
  {
    name: 'Sığortalı növü',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.CustomersCategory.localeCompare(b.CustomersCategory),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.CustomersCategory.indexOf(a) !== -1),
  },
  {
    name: 'Müştəri kateqoriyası',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.SecondCustCat.localeCompare(b.SecondCustCat),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.SecondCustCat.indexOf(a) !== -1),
  },
  {
    name: 'Hadisə tarixçəsi',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.EventHistory.localeCompare(b.EventHistory),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.EventHistory.indexOf(a) !== -1),
  },
  {
    name: 'Başlama tarixi',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.StartDate.localeCompare(b.StartDate),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.StartDate.indexOf(a) !== -1),
  },
  {
    name: 'Bitmə tarixi',
    sortOrder: null,
    sortFn: (a: CampaignListModel, b: CampaignListModel) => a.ExpireDate.localeCompare(b.ExpireDate),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: CampaignListModel) => list.some((a) => item.ExpireDate.indexOf(a) !== -1),
  },
  {
    name: '',
    sortOrder: null,
    sortFn: null,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null,
  },
  {
    name: '',
    sortOrder: null,
    sortFn: null,
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: null,
  },
];
