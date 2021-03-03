import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { PostMedia, PostMediaResponse, PostsResponse } from '../models/posts';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  public getPosts(params: any): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${environment.apiUrl}/posts`, { params });
  }

  public getPostMedia(mediaId: string): Observable<PostMedia> {
    return this.http.get<PostMediaResponse>(`${environment.apiUrl}/medias/${mediaId}`).pipe(
      map(resp => resp.response.media)
    );
  }
}
