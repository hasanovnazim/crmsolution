import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import AudioRecordsComponent from './audio-records.component';
import { AudioRecordsRoutingModule } from './audio-records-routing.module';

@NgModule({
  declarations: [AudioRecordsComponent],
  imports: [CommonModule, AudioRecordsRoutingModule],
  exports: [AudioRecordsComponent],
  providers: [],
})
export class AudioRecordsModule {}
