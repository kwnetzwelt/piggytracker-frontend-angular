import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
