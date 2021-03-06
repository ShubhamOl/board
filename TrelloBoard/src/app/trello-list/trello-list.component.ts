import { CommonDialogComponent } from './../common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TrelloCard } from './../trello-card/trello-card.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface TrelloList{
  name: string;
  sequence: number;
  id: number;
  cards: TrelloCard[];
}

@Component({
  selector: 'app-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrls: ['./trello-list.component.css']
})

export class TrelloListComponent implements OnInit {

  @Input() listData: TrelloList;
  @Output() updateList = new EventEmitter<TrelloList>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.listData.cards.length > 1){
      this.listData.cards = this.listData.cards.sort((b , a) => {
         return new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime();
      });
    }
  }

  addNewCard(): void{
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        mode: 'card'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    const card: TrelloCard = {
      name: result.name,
      description: result.description,
      timeCreated: new Date()
    };

    this.listData.cards.push(card);
    this.listData.cards = this.listData.cards.sort((b , a) => {
      return new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime();
    });
    this.updateList.emit(this.listData);
    });
  }

  deleteList(): void{
    this.listData.sequence = -1;
    this.updateList.emit(this.listData);
  }

  drop(event: CdkDragDrop<TrelloList>): void {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data.cards ,
                        event.container.data.cards ,
                        event.previousIndex,
                        event.currentIndex);

      this.listData.cards = this.listData.cards.sort((b , a) => {
        return new Date(a.timeCreated).getTime() - new Date(b.timeCreated).getTime();
      });
      this.updateList.emit(event.previousContainer.data);
      this.updateList.emit(event.container.data);

    }
  }

  removeCardAtIndex(index: number): void {
    if (index > -1 && index < this.listData.cards.length){
      this.listData.cards.splice(index, 1);

      this.updateList.emit(this.listData);
    }

  }

}


