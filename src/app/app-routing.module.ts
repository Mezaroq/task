import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupEditorComponent} from './group-editor/group-editor.component';

const routes: Routes = [
  {path: 'groups', component: GroupListComponent},
  {path: 'groups/:id', component: GroupEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
