import { Component, Input, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif is required');
  }

  @Input()
  public gif!:Gif;



}
