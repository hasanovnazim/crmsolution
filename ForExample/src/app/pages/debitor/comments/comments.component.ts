import { Component, OnInit } from '@angular/core';
import { Facade } from '../+state/facade';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import {
  AddComment,
  DebitorCommentsModel,
} from '../../../models/debitor-comments.model';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-debitor-component',
  templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
  loading$: Observable<boolean>;
  debitorPersonName$: Observable<string>;
  debitorComments$: Observable<DebitorCommentsModel[]>;
  insuredId!: string;
  insureTypeId!: string;
  insuredType!: string;
  policyId!: string;
  isAddCommentVisible = false;
  isOkLoading = false;
  newComment = '';
  insuredTypesEnum = {
    p: 1,
    c: 2,
  };
  constructor(
    private debitorsFacade: Facade,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
    this.loading$ = this.debitorsFacade.loading$;
    this.debitorPersonName$ = this.debitorsFacade.debitorDetails$.pipe(
      filter((v) => v.length > 0),
      map((dd) => dd[0].clientNameSurname)
    );
    this.debitorComments$ = this.debitorsFacade.debitorComments$;
  }

  ngOnInit() {
    this.insuredId = this.route.snapshot.paramMap.get('insuredId')!;
    this.insuredType = this.route.snapshot.paramMap.get('insuredType')!;
    this.insureTypeId = this.route.snapshot.paramMap.get('insureTypeId')!;
    this.policyId = this.route.snapshot.paramMap.get('policyId')!;

    if (!this.insuredId || !this.insureTypeId || !this.policyId) {
      this.router.navigate(['/debitor']);
      return;
    }

    this.debitorsFacade.getDebitorDetails(
      Number(this.insuredType),
      Number(this.insuredId)
    );
    this.debitorsFacade.getDebitorComments(
      Number(this.insureTypeId),
      Number(this.policyId)
    );
  }

  handleCancel(): void {
    this.isOkLoading = false;
    this.isAddCommentVisible = false;
    this.newComment = '';
  }

  createComment(): void {
    const body: AddComment = {
      policyId: Number(this.policyId),
      insureTypeId: Number(this.insureTypeId),
      comment: this.newComment,
    };
    this.debitorsFacade.createComment(body).subscribe({
      next: (v) => {
        if (v.code !== 2002) {
          this.notification.show('success', 'Success');
          this.debitorsFacade.getDebitorDetails(
            Number(this.insuredType),
            Number(this.insuredId)
          );
          this.debitorsFacade.getDebitorComments(
            Number(this.insureTypeId),
            Number(this.policyId)
          );
        }
        this.handleCancel();
      },
      error: (v) => {
        this.isOkLoading = false;
      },
    });
  }
}
