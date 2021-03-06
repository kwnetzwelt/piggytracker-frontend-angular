import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService, UserProfileInterface } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvitesService {

  private isInGroupChangedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isInGroupChanged = this.isInGroupChangedSubject.asObservable();

  private inviteCodeChangedSubject: BehaviorSubject<string> = new BehaviorSubject("");
  inviteCodeChanged = this.inviteCodeChangedSubject.asObservable();

  constructor(private authService: AuthService, private apiService: ApiService) { 

    this.authService.getLoggedIn.subscribe((isLoggedIn) => {
      this.update();
    })
    this.update();

  }

  public inviteCode: string = "";
  public inviteCodeExpires: Date;
  public inviteCodeFromUser: string;
  public groupName: string;
  public isInGroup: boolean;

  private update()
  {
    let userProfile = this.authService.getUserProfile();
    this.groupName = userProfile.groupName;
    this.isInGroup = userProfile.groupId !== userProfile.id;
    this.isInGroupChangedSubject.next(this.isInGroup);
  }

  public getInviteCode() {
    this.apiService.getInvite().subscribe((r) => {
      this.inviteCode = r.code;
      this.inviteCodeExpires = r.expires;
      this.inviteCodeFromUser = r.fromUser;
      this.inviteCodeChangedSubject.next(this.inviteCode);
    });
  }

  public joinGroup() {
    this.apiService.postInvite(this.inviteCode).subscribe((r) => {
      
      this.authService.updateUserProfile(r);
      this.update();
    });
  }

  public leaveGroup() {
    this.apiService.deleteInvite().subscribe((r) => {
      this.authService.updateUserProfile(r);
    });
  }
}
