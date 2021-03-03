import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnDestroy {
  // @ts-ignore
  private loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private timeoutId: any;
  // delay(0) - hack to manage expression changed error when set this variable from child component
  public loading$ = this.loading.asObservable().pipe(delay(0));

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  public show(): void {
    this.loading.next(true);
  }

  public hide(): void {
    this.timeoutId = setTimeout(() => {
      this.loading.next(false);
    }, 500);
  }
}
