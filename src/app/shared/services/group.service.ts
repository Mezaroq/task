import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Group} from '../interfaces/group';
import {map} from 'rxjs/operators';
import {GroupData} from '../interfaces/group-data';
import {User} from '../interfaces/user';
import {UserService} from './user.service';
import {GroupUpdate} from '../interfaces/group-update';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupUrl: string;

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.groupUrl = '/assets/groups.json';
  }

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(this.groupUrl);
  }

  getGroupById(id: number): Observable<number[]> {
    return this.httpClient.get<Group[]>(this.groupUrl).pipe(
      map(groups => groups.find(group => group.id === id)),
      map(group => !!group ? group.users : [])
    );
  }

  getUsersInGroup(id: number): Observable<GroupData[]> {
    return forkJoin({
      userIds: this.getGroupById(id),
      users: this.userService.getUsers()
    }).pipe(
      map((data: { userIds: number[], users: User[] }) => {
        const users: GroupData[] = [];
        data.users.forEach(user => users.push({user, checked: data.userIds.includes(user.id)}));
        return users;
      })
    );
  }

  updateGroup(groupId: number, data: GroupUpdate): Observable<GroupUpdate> {
    return this.httpClient.post<GroupUpdate>(`/api/groups/${groupId}/update`, data);
  }
}
