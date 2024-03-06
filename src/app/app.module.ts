import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MealTableComponent } from './meal-table/meal-table.component';
import { MealCardComponent } from './meal-card/meal-card.component';
import { EllipsisPipe } from './ellipsis-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MealTableComponent,
    MealCardComponent,
    EllipsisPipe
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
