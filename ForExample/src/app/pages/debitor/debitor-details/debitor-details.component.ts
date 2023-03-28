import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { Facade } from '../+state/facade';
import { DebitorDetails } from '../../../models/debitor-details.model';
import { ActivatedRoute } from '@angular/router';
import { AddComment } from '../../../models/debitor-comments.model';
import { NotificationService } from '../../../shared/notification.service';
import { NgForm } from '@angular/forms';
import { rolesList } from '../../../store/auth/roles/rolesList';

@Component({
  selector: 'app-debitor-details',
  templateUrl: './debitor-details.component.html',
})
export class DebitorDetailsComponent implements OnInit {
  loading$: Observable<boolean>;
  debitorPersonName$: Observable<string>;
  debitorDetails$: Observable<DebitorDetails[]>;

  isDateVisible = false;
  isOkLoading = false;
  selectedCancelDate: Date = new Date();
  cancelMessage = '';
  selectedDebitorDetails: DebitorDetails = {} as DebitorDetails;
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  isAddCommentVisible = false;
  addComment: AddComment = {
    comment: '',
    policyId: 0,
    insureTypeId: 0,
  };
  insureTypeId!: string;
  rolesList = rolesList;
  private selectedIndex: number = 0;
  @ViewChild('addCommentForm') addCommentForm!: NgForm;
  constructor(
    private debitorsFacade: Facade,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {
    this.loading$ = this.debitorsFacade.loading$;
    this.debitorDetails$ = this.debitorsFacade.debitorDetails$;
    this.debitorPersonName$ = this.debitorsFacade.debitorDetails$.pipe(
      filter((v) => v.length > 0),
      map((dd) => dd[0].clientNameSurname)
    );
  }

  ngOnInit() {
    const insuredId = this.route.snapshot.paramMap.get('insuredId');
    const insuredType = this.route.snapshot.paramMap.get('insuredType');
    this.insureTypeId = this.route.snapshot.paramMap.get('insureTypeId')!;

    this.debitorsFacade.getDebitorDetails(
      Number(insuredType),
      Number(insuredId)
    );
  }

  showDateModal(
    date: string,
    selectedDetails: DebitorDetails,
    index: number
  ): void {
    this.selectedCancelDate = date as unknown as Date;
    this.selectedDebitorDetails = selectedDetails;
    this.selectedIndex = index;
    this.isDateVisible = true;
  }
  handleDateOk(): void {
    const msInDay = 24 * 60 * 60 * 1000;
    const { policyId, insureTypeId, debtInfo } = this.selectedDebitorDetails;
    const { addId, installId, isInstall } = debtInfo[this.selectedIndex];

    const dayCount =
      (new Date(this.selectedCancelDate).getTime() -
        new Date(
          this.selectedDebitorDetails.debtInfo[
            this.selectedIndex
          ].estimatedCancelDate
        ).getTime()) /
      msInDay;
    this.debitorsFacade.increaseDebitorCancellation(
      isInstall,
      dayCount,
      installId,
      addId,
      policyId,
      insureTypeId
    );
    this.isOkLoading = true;

    this.handleCancel();
  }

  handleCancel(): void {
    this.isDateVisible = false;
    this.isAddCommentVisible = false;
    this.isOkLoading = false;
    this.cancelMessage = '';
    this.addComment = {
      comment: '',
      policyId: 0,
      insureTypeId: 0,
    };
  }

  showAddComentModal(policyId: number, insureTypeId: number) {
    this.addComment = {
      policyId,
      insureTypeId,
      comment: '',
    };
    this.isAddCommentVisible = true;
  }

  createComment(): void {
    this.debitorsFacade.createComment(this.addComment).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', 'Success');

          const insuredId = this.route.snapshot.paramMap.get('insuredId');
          const insuredType = this.route.snapshot.paramMap.get('insuredType');

          this.debitorsFacade.getDebitorDetails(
            Number(insuredType),
            Number(insuredId)
          );
        }
        this.handleCancel();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
  invoiceDownloadUrl(invoiceId: number) {
    return this.debitorsFacade.invoiceDownloadUrl(invoiceId);
  }
}
