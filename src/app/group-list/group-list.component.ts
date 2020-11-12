import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/services/group.service';
import {Observable} from 'rxjs';
import {Group} from '../shared/interfaces/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.sass']
})
export class GroupListComponent implements OnInit {
  groups$: Observable<Group[]>;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groups$ = this.groupService.getGroups();
  }

}
