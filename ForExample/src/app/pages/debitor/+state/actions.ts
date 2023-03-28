import { createAction, props } from '@ngrx/store';
import { httpActionTypeGenerator } from 'src/app/shared/actionTypeGenerator';
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

const getDebitors = createAction(
  httpActionTypeGenerator('debitors', 'GET').start
);
const getDebitorsComplete = createAction(
  httpActionTypeGenerator('debitors', 'GET').complete,
  props<{ debitors: Data<DebitorModel> }>()
);
const getDebitorsError = createAction(
  httpActionTypeGenerator('debitors', 'GET').error,
  props<{ error: any }>()
);

const changeDebitorTab = createAction(
  'debitors change tab',
  props<{ selectedTab: number }>()
);
const changeDebitorParams = createAction(
  'debitors change param',
  props<{ param: string; value: string | number | boolean }>()
);
const removeDebitorParam = createAction(
  'debitors remove param',
  props<{ param: string }>()
);
const removeAllDebitorParam = createAction('debitors remove all param');
const changePagination = createAction(
  'debitors change Pagination',
  props<{ page: number }>()
);

const getPages = createAction(httpActionTypeGenerator('pages', 'GET').start);
const getPagesComplete = createAction(
  httpActionTypeGenerator('pages', 'GET').complete,
  props<{ pages: Data<PageModel> }>()
);
const getPagesError = createAction(
  httpActionTypeGenerator('pages', 'GET').error,
  props<{ error: any }>()
);
const getBranchs = createAction(
  httpActionTypeGenerator('branches', 'GET').start,
  props<{ branchName: string }>()
);
const getBranchsComplete = createAction(
  httpActionTypeGenerator('branches', 'GET').complete,
  props<{ branches: Data<BranchModel> }>()
);
const getBranchsError = createAction(
  httpActionTypeGenerator('branches', 'GET').error,
  props<{ error: any }>()
);
const getPolicySeries = createAction(
  httpActionTypeGenerator('PolicySeries', 'GET').start,
  props<{ policySeries: string }>()
);
const getPolicySeriesComplete = createAction(
  httpActionTypeGenerator('PolicySeries', 'GET').complete,
  props<{ policySeries: Data<PolicySeriesModel> }>()
);
const getPolicySeriesError = createAction(
  httpActionTypeGenerator('PolicySeries', 'GET').error,
  props<{ error: any }>()
);
const getCurrencies = createAction(
  httpActionTypeGenerator('Currencies', 'GET').start,
  props<{ currencyCode: string }>()
);
const getCurrenciesComplete = createAction(
  httpActionTypeGenerator('Currencies', 'GET').complete,
  props<{ currency: Data<CurrenyModel> }>()
);
const getCurrenciesError = createAction(
  httpActionTypeGenerator('Currencies', 'GET').error,
  props<{ error: any }>()
);
const getInsuredTypes = createAction(
  httpActionTypeGenerator('InsuredTypes', 'GET').start
);
const getInsuredTypesComplete = createAction(
  httpActionTypeGenerator('InsuredTypes', 'GET').complete,
  props<{ insuredType: Data<InsuredType> }>()
);
const getInsuredTypesError = createAction(
  httpActionTypeGenerator('InsuredTypes', 'GET').error,
  props<{ error: any }>()
);
const getIfrs = createAction(httpActionTypeGenerator('IFRS', 'GET').start);
const getIfrsComplete = createAction(
  httpActionTypeGenerator('IFRS', 'GET').complete,
  props<{ ifrs: Data<IfrsModel> }>()
);
const getIfrsError = createAction(
  httpActionTypeGenerator('IFRS', 'GET').error,
  props<{ error: any }>()
);
const getDebitorDetails = createAction(
  httpActionTypeGenerator('Debitor Details', 'GET').start,
  props<{ insureTypeId: number; insuredId: number }>()
);
const getDebitorDetailsComplete = createAction(
  httpActionTypeGenerator('Debitor Details', 'GET').complete,
  props<{ debitorDetails: Data<DebitorDetails> }>()
);
const getDebitorDetailsError = createAction(
  httpActionTypeGenerator('Debitor Details', 'GET').error,
  props<{ error: any }>()
);
const getDebitorComments = createAction(
  httpActionTypeGenerator('Debitor Comments', 'GET').start,
  props<{ insureTypeId: number; policyId: number }>()
);
const getDebitorCommentsComplete = createAction(
  httpActionTypeGenerator('Debitor Comments', 'GET').complete,
  props<{ comments: Data<DebitorCommentsModel> }>()
);
const getDebitorCommentsError = createAction(
  httpActionTypeGenerator('Debitor Comments', 'GET').error,
  props<{ error: any }>()
);
const debitorCancellationIncrease = createAction(
  httpActionTypeGenerator('Debitor Cancellation', 'POST').start,
  props<{
    isInstallment: boolean;
    dayCount: number;
    installId: number;
    addId: number;
    policyId: number;
    insureTypeId: number;
  }>()
);
const debitorCancellationIncreaseComplete = createAction(
  httpActionTypeGenerator('Debitor Cancellation', 'POST').complete
);
const debitorCancellationIncreaseError = createAction(
  httpActionTypeGenerator('Debitor Cancellation', 'POST').error,
  props<{ error: any }>()
);

export const Actions = {
  getDebitors,
  getDebitorsComplete,
  getDebitorsError,
  changeDebitorParams,
  changeDebitorTab,
  getPages,
  getPagesComplete,
  getPagesError,
  changePagination,
  removeDebitorParam,
  removeAllDebitorParam,
  getBranchs,
  getBranchsComplete,
  getBranchsError,
  getPolicySeries,
  getPolicySeriesComplete,
  getPolicySeriesError,
  getCurrencies,
  getCurrenciesComplete,
  getCurrenciesError,
  getInsuredTypes,
  getInsuredTypesComplete,
  getInsuredTypesError,
  getDebitorDetails,
  getDebitorDetailsComplete,
  getDebitorDetailsError,
  getDebitorComments,
  getDebitorCommentsComplete,
  getDebitorCommentsError,
  debitorCancellationIncrease,
  debitorCancellationIncreaseComplete,
  debitorCancellationIncreaseError,
  getIfrs,
  getIfrsComplete,
  getIfrsError,
};
