import { Injectable } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private updateInterval = interval(5000);
  private paused = false;
  private loggedIn = false;
  private lastUpdateRun = new Date();

  private onUpdateSubject: BehaviorSubject<number> = new BehaviorSubject(null);
  onUpdate = this.onUpdateSubject.asObservable();

  public stop() {
    this.paused = true;
  }
  public start() {
    this.paused = false;
  }
  constructor(private authService: AuthService) { }
  init() {
    this.authService.getLoggedIn.subscribe((v) => {
      this.loggedIn = v;
      this.update();
    });
    this.updateInterval.subscribe(() => this.update());

  }

  private update() {
    if(!this.paused && this.loggedIn)
    {
      this.onUpdateSubject.next(new Date().getTime() - this.lastUpdateRun.getTime());
      this.lastUpdateRun = new Date();
    }
  }
}
