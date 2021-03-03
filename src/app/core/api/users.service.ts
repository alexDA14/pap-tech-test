import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User, UserResponse } from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) {
  }

  public getUserByName(userName: string): Observable<User> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/users/${userName}`).pipe(
      map(resp => resp.response.user)
    );
  }
}
