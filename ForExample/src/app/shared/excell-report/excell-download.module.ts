import { NgModule } from '@angular/core';
import { ExcellDownloadComponent } from './excell-download.component';
import { CommonModule } from '@angular/common';
import { DownloadFileModule } from '../download-file/download-file.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [ExcellDownloadComponent],
  imports: [
    CommonModule,
    DownloadFileModule,
    NzButtonModule,
    NzDropDownModule,
    NzSpinModule,
    IconsProviderModule,
  ],
  exports: [ExcellDownloadComponent],
})
export class ExcellDownloadModule {}
