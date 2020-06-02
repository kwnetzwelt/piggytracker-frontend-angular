import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-remunerator',
  templateUrl: './remunerator.component.html',
  styleUrls: ['./remunerator.component.scss']
})
export class RemuneratorComponent implements OnInit {

  @Input() name: string = undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
