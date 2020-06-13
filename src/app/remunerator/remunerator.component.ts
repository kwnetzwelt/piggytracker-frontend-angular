import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../api.service';

@Component({
  selector: 'app-remunerator',
  templateUrl: './remunerator.component.html',
  styleUrls: ['./remunerator.component.scss']
})
export class RemuneratorComponent implements OnInit {

  @Input() entry: Entry = null;
  constructor() { }

  ngOnInit(): void {
  }

}
