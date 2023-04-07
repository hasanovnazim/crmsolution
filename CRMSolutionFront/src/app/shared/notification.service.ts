import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private message: NzMessageService) {}

  show(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
