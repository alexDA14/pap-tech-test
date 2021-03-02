import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PostMediaResponse, PostsResponse } from '../models/posts';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  public getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts`);
  }

  public getPostMedia(mediaId: string): Observable<PostMediaResponse> {
    return this.http.get<PostMediaResponse>(`${environment.apiUrl}/medias/${mediaId}`);
  }
}
