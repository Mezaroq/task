import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, NEVER, Observable, SubscriptionLike} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../shared/services/group.service';
import {UserService} from '../shared/services/user.service';
import {GroupData} from '../shared/interfaces/group-data';
import {catchError, map} from 'rxjs/operators';
import {GroupUpdate} from '../shared/interfaces/group-update';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.sass']
})
export class GroupEditorComponent implements OnInit, OnDestroy {
  groupData: GroupData[];
  dataSubscription: SubscriptionLike;
  groupId: number;
  isLoading: boolean;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    // tslint:disable-next-line:radix
    this.groupId = parseInt(activatedRoute.snapshot.paramMap.get('id'));
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.dataSubscription = this.groupService.getUsersInGroup(this.groupId)
      .pipe(
        map(users => users.map(user => ({...user, initState: user.checked})))
      )
      .subscribe(users => {
        this.groupData = users;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  onClick(id: number): void {
    const user = this.groupData.find(value => value.user.id === id);
    user.checked = !user.checked;
  }

  onCancel(): void {
    this.router.navigate(['groups']);
  }

  onSave(): void {
    const groupUpdate: GroupUpdate = {
      addedUserIds: [],
      deletedUserIds: []
    };

    this.groupData.map(data => {
      if (data.checked !== data.initState) {
        if (data.checked) {
          groupUpdate.addedUserIds.push(data.user.id);
        } else {
          groupUpdate.deletedUserIds.push(data.user.id);
        }
      }
    });

    this.groupService.updateGroup(this.groupId, groupUpdate)
      .pipe(
        catchError((err) => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe(update => {
      });
    this.router.navigate(['groups']);
  }
}
