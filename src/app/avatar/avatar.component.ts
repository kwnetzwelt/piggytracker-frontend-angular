import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() src: string = undefined;
  @Input() name: string = undefined;

  @Input() small: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
