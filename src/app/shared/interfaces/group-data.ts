import {User} from './user';

export interface GroupData {
  user: User;
  checked: boolean;
  initState?: boolean;
}
