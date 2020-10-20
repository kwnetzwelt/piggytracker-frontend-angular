import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LogService } from '../log.service';
import { BehaviorSubject } from 'rxjs';
import { MatRipple } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {
  @ViewChild(MatButton) buttonRef: MatButton;

  @Output()
  public clickFinal = new EventEmitter<DeleteButtonComponent>();

  public color: string = "warn";
  public buttonText: string = "(3) Delete";

  public deleteTicksLeft: number = 0;
  public deleteTicks: number = 3;
  public deleteButtonTextEmitter: BehaviorSubject<string>;
  public deleteButtonEnabled: boolean = true;
  public deleteButtonReady: boolean = false;
  public deleteTimerSubscription;

  constructor(public logService:LogService) { }

  ngOnInit()
  {
    this.deleteButtonTextEmitter = new BehaviorSubject<string>(this.buttonText);
  }
  ngOnDestroy()
  {
    clearInterval(this.deleteTimerSubscription);
  }


  public click(): void
  {
    if(!this.deleteButtonReady)
    {
      this.color = "";
      this.deleteButtonReady = false;
      this.deleteButtonEnabled = false;
      this.deleteTicksLeft = this.deleteTicks;
      this.updateDeleteButtonText();
      if(this.deleteTimerSubscription)
        clearInterval(this.deleteTimerSubscription);
      this.deleteTimerSubscription = setInterval(() => {this.deleteTick()}, 1000);
    }else
    {
      this.clickFinal.emit(this);
    }
  }
  deleteTick(): void {
    this.deleteTicksLeft--;
    this.updateDeleteButtonText();
    if(this.deleteTicksLeft <= 0)
    {
      this.deleteButtonReady = true;
      clearInterval(this.deleteTimerSubscription);
      this.color = "warn";
      this.buttonRef.ripple.launch({centered: true, persistent: false, color:"#ffffff55"});

    }else
    {
      this.buttonRef.ripple.launch({centered: true, persistent: false, color:"#ff000055"});

    }
    this.logService.log(this.buttonText);


  }

  updateDeleteButtonText(): void
  {
    if(this.deleteTicksLeft <= 0)
      this.buttonText = "Delete";
    else
      this.buttonText = "(" + this.deleteTicksLeft + ") Delete";
    this.deleteButtonTextEmitter.next(this.buttonText);
  }
}
