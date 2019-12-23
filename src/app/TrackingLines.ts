import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'trackinglines',
  template:`<canvas #myCanvas width="400" height="400" style="background:lightgray;" (mousedown)="mdEvent($event)" (mouseup)="muEvent($event)" (mousemove)="mmEvent($event)"></canvas>`,
  styleUrls: ['./TrackingLines.css']
})
export class TrackingLines implements OnInit{
  startX:number=null;
  startY:number=null;
  drag=false;

  @ViewChild("myCanvas") myCanvas:ElementRef;

  mdEvent(e){
      //persist starting position
      this.startX=e.clientX;
      this.startY=e.clientY;
      this.drag=true;
  }

  mmEvent(e){

      if(this.drag){

          //redraw image on canvas
          let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
        
          //draw rectangle on canvas
          let x = this.startX - this.myCanvas.nativeElement.getBoundingClientRect().left;
          let y= this.startY- this.myCanvas.nativeElement.getBoundingClientRect().top;
          let w = e.clientX -this.myCanvas.nativeElement.getBoundingClientRect().left - x;
          let h = e.clientY -this.myCanvas.nativeElement.getBoundingClientRect().top - y;
          context.setLineDash([6]);
          context.strokeRect(x, y, w, h);
      }
  }

  muEvent(e){
      //draw final rectangle on canvas
      let x = this.startX - this.myCanvas.nativeElement.getBoundingClientRect().left;
      let y= this.startY- this.myCanvas.nativeElement.getBoundingClientRect().top;
      let w = e.clientX -this.myCanvas.nativeElement.getBoundingClientRect().left - x;
      let h = e.clientY -this.myCanvas.nativeElement.getBoundingClientRect().top - y;
      this.myCanvas.nativeElement.getContext("2d").setLineDash([6]);
      this.myCanvas.nativeElement.getContext("2d").strokeRect(x, y, w, h);

      this.drag=false;
  }

  ngOnInit(){

      //draw image on canvas
      let base_image = new Image();
      base_image.src = 'https://ak3.picdn.net/shutterstock/videos/10826363/thumb/1.jpg';
      let context: CanvasRenderingContext2D = this.myCanvas.nativeElement.getContext("2d");
      base_image.onload = function(){
          context.canvas.height=base_image.height;
          context.canvas.width=base_image.width;
          context.drawImage(base_image, 0, 0);
      }
  }}
