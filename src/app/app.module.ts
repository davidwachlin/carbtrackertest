import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MealTableComponent } from './meal-table/meal-table.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { MealCardListComponent } from './meal-card-list/meal-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MealTableComponent,
    MenuItemListComponent,
    MealCardComponent,
    MealCardListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
