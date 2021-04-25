import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  audioObj = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ]
  files=[
    {
      url:'./assets/BillieEilish-oceaneyes.mp3',
      name: 'Ocean eyes',
      artist: 'Billie Eilish'
    },
    {
      url: './assets/ChiefKeef-LoveSosa.mp3',
      name: 'Love Sosa',
      artist: 'Chief Keef'
    },
    {
      url: './assets/RoddyRicch-BoomBoomRoom.mp3',
      name: 'Boom Boom Room',
      artist: 'Roddy Ricch'
    }
  ];

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;

  streamObserver(url){
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event)=>{
        console.log(event);
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj, events, handler){
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj, events, handler){
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(event){
    this.audioObj.currentTime = event.target.value;
  }

  setVolume(event){
    this.audioObj.volume = event.target.value;
    console.log(event.target.value);
  }

  openFile(url){
    this.streamObserver(url).subscribe(event => {});
  }

  play(){
    this.audioObj.play();
  }
  pause(){
    this.audioObj.pause();
  }
  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
