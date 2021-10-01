import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TrelloCard{
  name: string;
  description?: string;
  timeCreated?: Date;
}

@Component({
  selector: 'app-trello-card',
  templateUrl: './trello-card.component.html',
  styleUrls: ['./trello-card.component.css']
})
export class TrelloCardComponent implements OnInit {

  @Input() cardData: TrelloCard;
  @Input() index: number;
  @Output() removeCard = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCard(): void {
    this.removeCard.emit(this.index);
  }

}

