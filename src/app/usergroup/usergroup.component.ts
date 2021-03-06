import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InvitesService } from '../invites.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UsergroupComponent implements OnInit {

  constructor(public invitesService:InvitesService) { 
    invitesService.isInGroupChanged.subscribe((isInGroup) => {
      this.update();
    });
    invitesService.inviteCodeChanged.subscribe((code) => {
      this.update();
    })
    this.update();
  }

  public inviteCode: FormControl = new FormControl();

  private update(): void {
    this.inviteCode.setValue(this.invitesService.inviteCode);
  }

  public onChange(event): void 
  {
    this.invitesService.inviteCode = this.inviteCode.value;
    this.update();
  }

  ngOnInit(): void {

  }

  public joinClicked(): void
  {
    this.invitesService.joinGroup();
  }
  public generateClicked(): void
  {
    this.invitesService.getInviteCode();
  }
  public leaveClicked(): void
  {
    this.invitesService.leaveGroup();
  }

}
