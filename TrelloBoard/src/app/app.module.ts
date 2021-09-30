import { MatHelperModule } from './mat-helper/mat-helper.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrelloListComponent } from './trello-list/trello-list.component';
import { TrelloCardComponent } from './trello-card/trello-card.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TrelloListComponent,
    TrelloCardComponent,
    CommonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatHelperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
