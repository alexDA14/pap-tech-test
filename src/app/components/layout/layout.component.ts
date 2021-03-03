import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject, Subscription, timer } from 'rxjs';
import { repeatWhen, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { PostsService } from '../../core/api/posts.service';
import { UsersService } from '../../core/api/users.service';
import { SLIDE_INTERVAL } from '../../core/constants/configuration.constants';
import { Post } from '../../core/models/posts';
import { LoadingService } from '../../services/loading.service';
import { PostViewService } from '../../services/post-view.service';

@Component({
  selector: 'pap-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  public loading: Observable<boolean>;
  public postView: Post;

  private subs: Subscription = new Subscription();
  private postIndex = 0;
  private reset$ = new Subject();

  constructor(
    private loadingService: LoadingService,
    private postsService: PostsService,
    private usersService: UsersService,
    private postViewService: PostViewService
  ) {
    this.loading = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.subs.add(
      this.postViewService.hasPosts$
        .pipe(
          take(1),
          switchMap(() => timer(0, SLIDE_INTERVAL).pipe(
            takeUntil(this.reset$),
            repeatWhen(() => this.reset$)
          )),
          switchMap(() => this.getPost()),
          tap(() => this.loadingService.hide())
        )
        .subscribe(([post]) => {
          if (!post) {
            this.postIndex = 0;
            this.reset$.next();
            return;
          }

          this.postIndex++;
          this.postView = post;
        }, () => this.loadingService.hide())
    );
  }

  private getPost(): Observable<[Post, Post]> {
    return forkJoin([
      this.postViewService.getPost(this.postIndex),
      this.postViewService.getPost(this.postIndex + 1)
    ]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
