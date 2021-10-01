import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TrelloList } from './trello-list/trello-list.component';
import { Component, OnInit } from '@angular/core';
import { TrelloCard } from './trello-card/trello-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public trelloBoard: TrelloList[];

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    this.trelloBoard = [];
    const trelloBoardFromStorage = localStorage.getItem('trelloBoard');
    if (trelloBoardFromStorage !== null && trelloBoardFromStorage !== undefined && trelloBoardFromStorage !== ''){
      try {
        this.trelloBoard = JSON.parse(trelloBoardFromStorage);
      } catch (error) {
        console.error('Error while parsing json' + error);
      }
    }
    else { localStorage.setItem('trelloBoard', JSON.stringify([])); }
  }

  saveTrelloSnapShot(): void {
    localStorage.setItem('trelloBoard', JSON.stringify(this.trelloBoard));
  }

  addList(): void {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        mode: 'list'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newId: number;

      while (true){
        newId = Math.floor(1000 + Math.random() * 9000);
        if (this.trelloBoard.filter(i => i.id === newId).length === 0 ){
          break;
        }
      }
      const newTrelloList: TrelloList = {
        sequence: this.trelloBoard.length,
        name: result.name ? result.name : 'N/A',
        cards: [],
        id: newId
      };

      this.trelloBoard.push(newTrelloList);
      this.saveTrelloSnapShot();
      });


  }

  updateList(updatedList: TrelloList): void{
    if (updatedList.sequence >= 0){
      this.trelloBoard.forEach((list, index) => {
        if (list.id === updatedList.id){
          this.trelloBoard[index].cards = updatedList.cards;
        }
      });
    }
    else {
      this.trelloBoard = this.trelloBoard
      .filter(i => i.id !== updatedList.id);
    }
    this.saveTrelloSnapShot();
  }

}
