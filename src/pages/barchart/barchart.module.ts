import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarchartPage } from './barchart';

@NgModule({
  declarations: [
    BarchartPage,
  ],
  imports: [
    IonicPageModule.forChild(BarchartPage),
  ],
})
export class BarchartPageModule {}
