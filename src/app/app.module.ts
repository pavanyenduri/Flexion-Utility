import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DailyScrumComponent } from './daily-scrum/daily-scrum.component';
import { SprintReviewComponent } from './sprint-review/sprint-review.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { RemindersComponent } from './reminders/reminders.component';
import {MatTabsModule} from '@angular/material/tabs';
import { A11yModule } from '@angular/cdk/a11y';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    DailyScrumComponent,
    SprintReviewComponent,
    ManageTeamComponent,
    RemindersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    MatNativeDateModule,
    MatRippleModule,
    MatTabsModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
