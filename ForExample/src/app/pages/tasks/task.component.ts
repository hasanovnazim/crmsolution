import { Component, OnInit } from '@angular/core';
import { Facade } from './+state/facade';
import { Observable } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { NotificationService } from '../../shared/notification.service';
import { InsuredType } from '../../models/insured-type.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './tasks.component.html',
})
export default class TaskComponent implements OnInit {
  tasks$: Observable<TaskModel[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;
  currentPage$: Observable<number>;
  insuredTypes$: Observable<InsuredType[]>;
  params$: Observable<Partial<TaskModel>>;

  constructor(
    private facade: Facade,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {
    this.tasks$ = this.facade.tasks$;
    this.loading$ = this.facade.loading$;
    this.count$ = this.facade.count$;
    this.currentPage$ = this.facade.currentPage$;
    this.insuredTypes$ = this.facade.getInsuredTypes();
    this.params$ = this.facade.params$;
  }

  ngOnInit() {
    const taskId = this.route.snapshot.queryParams['taskId'];
    if (taskId) {
      this.facade.changeParams('taskId', taskId);
    } else {
      this.facade.getTasks();
    }
    this.insuredTypes$.subscribe();
  }
  pageChange(page: number) {
    this.facade.changePage(page);
  }
  pageSizeChange(size: number) {
    this.facade.changeParams('limit', size);
  }

  // getInsuredType(insuredTypes: InsuredType[], id: number) {
  //   return insuredTypes.find(v => v.type === id).description
  // }
}
