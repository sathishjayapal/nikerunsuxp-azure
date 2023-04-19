import { NgModule } from '@angular/core';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { NikerunslistComponent } from './nike-runs-list/nikerunslist.component';
import { RouterModule } from '@angular/router';
import {DataTablesModule} from "angular-datatables";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [NikerunslistComponent, ConvertToSpacesPipe],
  imports: [
    DataTablesModule,
    RouterModule.forChild([
      {path: 'products', component: NikerunslistComponent},
    ]),
    SharedModule,
    MatTableModule
  ],
})
export default class NikeRunsModule {}
