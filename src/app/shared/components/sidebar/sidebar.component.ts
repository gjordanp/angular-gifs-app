import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

    constructor(private gifsService:GifsService) { }

    get tags(){
      return this.gifsService.tagsHistory;
    }


    onClick(tag:string){
      this.gifsService.searchTag(tag);
    }

}
