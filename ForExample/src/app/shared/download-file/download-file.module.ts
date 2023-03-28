import { NgModule } from '@angular/core';
import { DownloadFileDirective } from './download-file.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DownloadFileDirective],
  imports: [CommonModule],
  exports: [DownloadFileDirective],
})
export class DownloadFileModule {}
