import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interface/gifs.interfaces';

@Injectable({providedIn: 'root'}) //si no se usa providedIn: 'root' se debe importar en prodivers el app.module.ts
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'GpmOxqip3wWSfXi4yDnXE4e63wbiX0k1'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag=tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(t=>t!==tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocarStorage();

  }

  private saveLocarStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    const history = localStorage.getItem('history');
    if(history){
      this._tagsHistory = JSON.parse(history);
    }
    if(this._tagsHistory.length===0) return;
    this.searchTag(this.tagsHistory[0]);
  }

  searchTag(tag: string):void{

    if(tag.length===0) return;

    this.organizeHistory(tag);

    // const resp= await fetch(`https://api.giphy.com/v1/gifs/search?api_key=GpmOxqip3wWSfXi4yDnXE4e63wbiX0k1&q=valorant&limit=10`)
    // const data= await resp.json();
    // console.log(data);

    const params= new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',tag)
    .set('limit','10');

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp =>{

      this.gifList = resp.data;
      console.log({gifs: this.gifList});
    })
  }
}
