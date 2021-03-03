import { Component, OnInit } from '@angular/core';
import { InvitesService } from '../invites.service';
import { UpdateService } from '../update.service';

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

  public canJoin: boolean;
  public canLeave: boolean;
  public canGenerate: boolean;
  public inviteCode: string;

  private update(): void {
    this.canJoin = this.invitesService.inviteCode !== "" && !this.invitesService.isInGroup;
    this.canLeave = this.invitesService.isInGroup;
    this.canGenerate = this.invitesService.inviteCode == "" && !this.invitesService.isInGroup;
    this.inviteCode = this.invitesService.inviteCode;
  }

  public onChange(event): void 
  {
    this.invitesService.inviteCode = this.inviteCode;
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
