import { Component, Input } from '@angular/core';
import { Meal } from '../types';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent {
  @Input() meals: Meal[] = [];
}
