import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../store/api.service';
import { Actions as debitorActions } from './actions';
import { map, switchMap, catchError, of, withLatestFrom } from 'rxjs';
import { ResponsePayload } from '../../../models/response.model';
import { DebitorModel } from '../../../models/debitor.model';
import { PageModel } from '../../../models/page.model';
import { HttpParams } from '@angular/common/http';
import { Facade } from './facade';
import { BranchModel } from '../../../models/branch.model';
import { PolicySeriesModel } from '../../../models/policy-series.model';
import { CurrenyModel } from '../../../models/curreny.model';
import { InsuredType } from '../../../models/insured-type.model';
import { DebitorDetails } from '../../../models/debitor-details.model';
import { DebitorCommentsModel } from '../../../models/debitor-comments.model';
import { Router } from '@angular/router';
import { IfrsModel } from '../../../models/Ifrs.model';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private debitorFacade: Facade,
    private route: Router
  ) {}

  onGetDebitors = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getDebitors),
        withLatestFrom(
          this.debitorFacade.params$,
          this.debitorFacade.selectedTab$
        ),
        switchMap(([action, params, selectedTab]) => {
          const pageId = selectedTab ? `&pageId=${selectedTab}` : '';
          return this.apiService
            .get<ResponsePayload<DebitorModel>>(
              'debitors?' + this.buildQueryParams(params) + pageId
            )
            .pipe(
              map((debitors) =>
                debitorActions.getDebitorsComplete({ debitors: debitors.data })
              ),
              catchError((error: any) =>
                of(debitorActions.getDebitorsError({ ...error }))
              )
            );
        })
      )
  );
  onGetPages = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getPages),
        withLatestFrom(this.debitorFacade.pages$),
        switchMap(([action, pages]) => {
          if (pages.length)
            return of(
              debitorActions.getPagesComplete({
                pages: { result: pages, count: pages.length },
              })
            );
          return this.apiService
            .get<ResponsePayload<PageModel>>('pages' + '?limit=1000000')
            .pipe(
              map((pages) =>
                debitorActions.getPagesComplete({ pages: pages.data })
              ),
              catchError((error: any) =>
                of(debitorActions.getPagesError({ ...error }))
              )
            );
        })
      )
  );
  onGetBranches = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getBranchs),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<BranchModel>>('branches' + '?limit=1000000')
            .pipe(
              map((branches) =>
                debitorActions.getBranchsComplete({ branches: branches.data })
              ),
              catchError((error: any) =>
                of(debitorActions.getBranchsError({ ...error }))
              )
            )
        )
      )
  );
  onGetPolicySeries = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getPolicySeries),
        withLatestFrom(this.debitorFacade.params$),
        switchMap(([action, params]) => {
          const pageId = params.pageId ? `&pageId=${params.pageId}` : '';
          return this.apiService
            .get<ResponsePayload<PolicySeriesModel>>(
              'policyseries' + '?limit=1000000' + `${pageId}`
            )
            .pipe(
              map((policySeries) =>
                debitorActions.getPolicySeriesComplete({
                  policySeries: policySeries.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getPolicySeriesError({ ...error }))
              )
            );
        })
      )
  );
  onGetCurrencies = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getCurrencies),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<CurrenyModel>>('currencies' + '?limit=1000000')
            .pipe(
              map((currencies) =>
                debitorActions.getCurrenciesComplete({
                  currency: currencies.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getCurrenciesError({ ...error }))
              )
            )
        )
      )
  );
  onGetInsuredTypes = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getInsuredTypes),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<InsuredType>>(
              'insuredTypes' + '?limit=1000000'
            )
            .pipe(
              map((insuredType) =>
                debitorActions.getInsuredTypesComplete({
                  insuredType: insuredType.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getInsuredTypesError({ ...error }))
              )
            )
        )
      )
  );
  onGetIfrs = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getIfrs),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<IfrsModel>>('debitors/ifrs' + '?limit=1000000')
            .pipe(
              map((ifrs) =>
                debitorActions.getIfrsComplete({
                  ifrs: ifrs.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getIfrsError({ ...error }))
              )
            )
        )
      )
  );

  onParamChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(
          debitorActions.changeDebitorParams,
          debitorActions.changeDebitorTab,
          debitorActions.removeDebitorParam,
          debitorActions.removeAllDebitorParam
        ),
        map(() => {
          this.debitorFacade.getApiFilters('policySeries');
          this.debitorFacade.getDebitors();
        })
      ),
    { dispatch: false }
  );

  onPageChange = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.changePagination),
        withLatestFrom(this.debitorFacade.params$),
        map(([action, params]) =>
          debitorActions.changeDebitorParams({
            param: 'offset',
            value: (action.page - 1) * (params.limit ?? 10),
          })
        )
      )
  );

  onGetDebitorDetails = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getDebitorDetails),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<DebitorDetails>>(
              `debitordetails?ClientId=${action.insuredId}&InsuredType=${action.insureTypeId}`
            )
            .pipe(
              map((debitorDetails) =>
                debitorActions.getDebitorDetailsComplete({
                  debitorDetails: debitorDetails.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getDebitorDetailsError({ ...error }))
              )
            )
        )
      )
  );

  onGetDebitorComments = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.getDebitorComments),
        switchMap((action) =>
          this.apiService
            .get<ResponsePayload<DebitorCommentsModel>>(
              `comments?PolicyId=${action.policyId}&InsureTypeId=${action.insureTypeId}`
            )
            .pipe(
              map((comments) =>
                debitorActions.getDebitorCommentsComplete({
                  comments: comments.data,
                })
              ),
              catchError((error: any) =>
                of(debitorActions.getDebitorCommentsError({ ...error }))
              )
            )
        )
      )
  );
  onDebitorCancellation = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.debitorCancellationIncrease),
        switchMap(
          ({
            isInstallment,
            dayCount,
            installId,
            addId,
            policyId,
            insureTypeId,
          }) =>
            this.apiService
              .post<ResponsePayload<DebitorCommentsModel>>(
                `cancellation/increase/bypivot`,
                {
                  isInstallment,
                  dayCount,
                  installId,
                  addId,
                  policyId,
                  insureTypeId,
                }
              )
              .pipe(
                map((comments) =>
                  debitorActions.debitorCancellationIncreaseComplete()
                ),
                catchError((error: any) =>
                  of(
                    debitorActions.debitorCancellationIncreaseError({
                      ...error,
                    })
                  )
                )
              )
        )
      )
  );

  debitorCancellationIncreaseComplete = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(debitorActions.debitorCancellationIncreaseComplete),
        map((action) => {
          const params = this.route.url.split('/');
          return debitorActions.getDebitorDetails({
            insureTypeId: Number(params[2]),
            insuredId: Number(params[3]),
          });
        })
      )
  );

  buildQueryParams(params: Partial<DebitorModel>): string {
    let newParams = { ...params };
    delete newParams.pageId;
    let httpParams = new HttpParams({ fromObject: newParams });
    return httpParams.toString();
  }
}
