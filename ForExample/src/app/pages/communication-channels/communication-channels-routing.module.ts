import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import CommunicationChannelsComponent from './communication-channels.component';
import { CommunicationSettingsComponent } from './communaction-settings/communication-settings.component';

const routes: Routes = [
  { path: '', component: CommunicationChannelsComponent },
  { path: 'settings', component: CommunicationSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationChannelsRoutingModule {}
