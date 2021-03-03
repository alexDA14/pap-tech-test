import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PostsService } from '../core/api/posts.service';
import { UsersService } from '../core/api/users.service';
import { PAGINATION_LIMIT } from '../core/constants/configuration.constants';
import { Post } from '../core/models/posts';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class PostViewService {
  private hasPosts = new ReplaySubject<boolean>();
  private postsList: Post[] = [];
  private offset = 0;
  private noData = false;

  public hasPosts$ = this.hasPosts.asObservable();

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private loadingService: LoadingService
  ) {
    this.getPosts(this.offset);
  }

  private getPosts(offset?: number, limit: number = PAGINATION_LIMIT): void {
    if (this.noData) {
      return;
    }

    const params = {
      limit: limit.toString(),
      offset: offset.toString()
    };
    this.postsService.getPosts(params)
      .pipe(
        tap(({ response }) => {
          this.noData = response.count < PAGINATION_LIMIT;
          this.offset += response.count;
          this.postsList = [...this.postsList, ...response.posts];
          this.hasPosts.next(!!this.postsList.length);
        })
      ).subscribe({ error: () => this.loadingService.hide() });
  }

  public getPost(postIndex: number): Observable<Post | null> {
    const post = this.postsList[postIndex];

    if ((postIndex + 1) === this.offset) {
      this.getPosts(this.offset);
    }

    if (!post) {
      return of(null);
    }

    if (post.media) {
      return of(post);
    }

    return forkJoin([
      this.postsService.getPostMedia(post.mediaId),
      this.usersService.getUserByName(post.user.username)
    ])
      .pipe(
        map(([postMedia, userData]) => {
          post.media = postMedia;
          post.userData = userData;
          return post;
        })
      );
  }
}
