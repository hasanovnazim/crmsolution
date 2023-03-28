import { DebitorModel } from '../../../models/debitor.model';
import { PageModel } from '../../../models/page.model';
import { Data } from '../../../models/response.model';
import { BranchModel } from '../../../models/branch.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { CurrenyModel } from '../../../models/curreny.model';
import { InsuredType } from '../../../models/insured-type.model';
import { DebitorDetails } from '../../../models/debitor-details.model';
import { DebitorCommentsModel } from '../../../models/debitor-comments.model';
import { IfrsModel } from '../../../models/Ifrs.model';

export interface DebitorsState {
  loading: boolean;
  debitors: Data<DebitorModel>;
  debitorDetails: Data<DebitorDetails>;
  params: Partial<DebitorModel>;
  selectedTab: number;
  paramsPerPage: Partial<DebitorModel>[];
  pages: Data<PageModel>;
  branches: Data<BranchModel>;
  policySeries: Data<PolicySeriesModel>;
  currency: Data<CurrenyModel>;
  insuredType: Data<InsuredType>;
  ifrs: Data<IfrsModel>;
  comments: Data<DebitorCommentsModel>;
  pagination: number;
  error: any;
}

export const initialParams: Partial<DebitorModel> = {
  limit: 10,
  offset: 0,
};

export const initialState: DebitorsState = {
  loading: true,
  debitors: {
    result: [],
    count: 0,
  },
  debitorDetails: { result: [], count: 0 },
  params: initialParams,
  selectedTab: 0,
  paramsPerPage: [{ ...initialParams, pageId: 0 }],
  pages: {
    result: [],
    count: 0,
  },
  branches: { result: [], count: 0 },
  policySeries: { result: [], count: 0 },
  currency: { result: [], count: 0 },
  insuredType: { result: [], count: 0 },
  ifrs: { result: [], count: 0 },
  comments: { result: [], count: 0 },
  pagination: 1,
  error: null,
};
