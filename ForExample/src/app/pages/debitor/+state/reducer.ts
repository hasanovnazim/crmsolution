import { Action, createReducer, on } from '@ngrx/store';
import { Actions } from './actions';
import { initialState, DebitorsState, initialParams } from './state';
import { DebitorModel } from '../../../models/debitor.model';

export const reducer = createReducer(
  initialState,
  on(Actions.getDebitors, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getDebitorsComplete, (state, { debitors }) => ({
    ...state,
    debitors,
    loading: false,
  })),
  on(Actions.getDebitorsError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.changeDebitorParams, (state, parameter) => {
    let idx = state.paramsPerPage.findIndex(
      (v) => v.pageId === state.selectedTab
    );
    // @ts-ignore
    state.paramsPerPage[idx][parameter.param] = parameter.value;
    return {
      ...state,
      params: {
        ...state.params,
        [parameter.param]: parameter.value,
      },
      paramsPerPage: [...state.paramsPerPage],
    };
  }),
  on(Actions.changeDebitorTab, (state, { selectedTab }) => ({
    ...state,
    selectedTab,
  })),
  on(Actions.removeDebitorParam, (state, { param }) => {
    const newParams: Partial<DebitorModel> = state.paramsPerPage.find(
      (v) => v.pageId === state.selectedTab
    )!;

    // @ts-ignore
    delete newParams[param];
    return {
      ...state,
      params: {
        ...newParams,
      },
      paramsPerPage: [...state.paramsPerPage],
    };
  }),
  on(Actions.removeAllDebitorParam, (state) => {
    let idx = state.paramsPerPage.findIndex(
      (v) => v.pageId === state.selectedTab
    );

    state.paramsPerPage[idx] = { pageId: state.selectedTab, ...initialParams };

    return {
      ...state,
      params: {
        limit: state.params.limit,
        offset: state.params.offset,
      },
      paramsPerPage: [...state.paramsPerPage],
    };
  }),
  on(Actions.getPages, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getPagesComplete, (state, { pages }) => ({
    ...state,
    pages,
    paramsPerPage: [
      { pageId: 0, ...initialParams },
      ...pages.result.map((v) => ({
        pageId: v.id,
        ...initialParams,
      })),
    ],
    loading: false,
  })),
  on(Actions.getPagesError, (state, error) => ({
    ...state,
    loading: false,
    error,
  })),
  on(Actions.getBranchs, (state) => ({
    ...state,
  })),
  on(Actions.getBranchsComplete, (state, { branches }) => ({
    ...state,
    branches,
  })),
  on(Actions.getBranchsError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.getPolicySeries, (state) => ({
    ...state,
  })),
  on(Actions.getPolicySeriesComplete, (state, { policySeries }) => ({
    ...state,
    policySeries,
  })),
  on(Actions.getPolicySeriesError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.getCurrencies, (state) => ({
    ...state,
  })),
  on(Actions.getCurrenciesComplete, (state, { currency }) => ({
    ...state,
    currency,
  })),
  on(Actions.getCurrenciesError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.getInsuredTypes, (state) => ({
    ...state,
  })),
  on(Actions.getInsuredTypesComplete, (state, { insuredType }) => ({
    ...state,
    insuredType,
  })),
  on(Actions.getInsuredTypesError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.getIfrs, (state) => ({
    ...state,
  })),
  on(Actions.getIfrsComplete, (state, { ifrs }) => ({
    ...state,
    ifrs,
  })),
  on(Actions.getIfrsError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.changePagination, (state, { page }) => ({
    ...state,
    pagination: page,
  })),
  on(Actions.getDebitorDetails, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getDebitorDetailsComplete, (state, { debitorDetails }) => ({
    ...state,
    debitorDetails: {
      ...debitorDetails,
      result: debitorDetails.result.map((v) => ({ ...v, expand: false })),
    },
    loading: false,
  })),
  on(Actions.getDebitorDetailsError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.getDebitorComments, (state) => ({
    ...state,
  })),
  on(Actions.getDebitorCommentsComplete, (state, { comments }) => ({
    ...state,
    comments,
  })),
  on(Actions.getDebitorCommentsError, (state, error) => ({
    ...state,
    error,
  })),
  on(Actions.debitorCancellationIncrease, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.debitorCancellationIncreaseComplete, (state) => ({
    ...state,
    loading: false,
  })),
  on(Actions.debitorCancellationIncreaseError, (state, error) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function reducerFactory(
  state: DebitorsState | undefined,
  actions: Action
) {
  return reducer(state, actions);
}
