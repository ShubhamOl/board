import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}

