import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { RemuneratorsService } from '../remunerators.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public categoriesService:CategoriesService, public remuneratorsService:RemuneratorsService) { }

  ngOnInit(): void {
  }

}
