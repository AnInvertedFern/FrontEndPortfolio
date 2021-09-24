import { Observable } from "rxjs";
import { User } from "../users/user";

export class MockUserService {
  public getUsers() {
    return new Observable(subscriber => { subscriber.next([]); subscriber.complete(); });
  }
  public addContact(userAddTo: User, userToAdd: User) {
    return new Observable(subscriber => { subscriber.next({}); subscriber.complete(); });
  }

  public updateUsers(user: User) {
    return new Observable(subscriber => { subscriber.next({}); subscriber.complete(); });
  }

  public addUser(user: User | any ) {
    return new Observable(subscriber => { subscriber.next({}); subscriber.complete(); });
  }

  public deleteUser(userID: number ) {
    return new Observable(subscriber => { subscriber.next({}); subscriber.complete(); });
  }
}
