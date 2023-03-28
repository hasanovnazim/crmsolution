import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import AudioRecordsComponent from './audio-records.component';

const routes: Routes = [{ path: '', component: AudioRecordsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioRecordsRoutingModule {}
