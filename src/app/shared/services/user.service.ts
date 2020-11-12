import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cache$: Observable<User[]>;

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    if (!this.cache$) {
      this.cache$ = this.httpClient.get<User[]>('/assets/users.json');
    }
    return this.cache$;
  }
}
