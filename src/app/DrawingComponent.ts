import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
    NgZone,
    Renderer2
  } from '@angular/core';
  import { fromEvent } from 'rxjs';
  import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
  import { Subscription } from 'rxjs';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
  import {ImageLabelDialog}   from './ImageLabelDialog';
  import {PascalVOCModel} from './PascalVOCModel';
  
  @Component({
    selector: 'app-drawing-board',
    template: `
          <span #tooltipspan></span>
          <canvas #canvas></canvas>`,
    styles: [
      `
        canvas {
          position:absolute;
          left:0;
          top:0;
          margin-top: 60px;
          margin-left: 450px;
          cursor: crosshair;
          z-index:20;
        },

      trackingline{
            outline: 1px solid yellow;
            opacity: 0.5;
            position: absolute;
            display: block;
        }`
    ]
  })
  export class DrawingComponent implements AfterViewInit, OnDestroy {
    @Input() width = 420;
    @Input() height = 750;
    @ViewChild('canvas') canvas: ElementRef;
    @ViewChild('tooltipspan') tooltipspan: ElementRef;
    
    cx: CanvasRenderingContext2D;
    drawingSubscription: Subscription;
    drawItems = [];
    labellingData = [];
    labelsInfo =[];
    startx =0;
    starty =0;
    rectangleWidth = 0;
    rectangleHeight =0;
    pascalvocmodel;
    
    constructor(public dialog: MatDialog, private renderer: Renderer2,private ngZone: NgZone) {
      this.pascalvocmodel = new PascalVOCModel();
      console.log('intiiate pascal voc model');
    }

    openDialog(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.position = { left: '20px' , top:'10px'}
      dialogConfig.width ='250px';
      let dialogRef;
      dialogRef = this.dialog.open(ImageLabelDialog, {panelClass: 'full-width-dialog'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.labelsInfo.push(result.description);
        this.pascalvocmodel.labelInfo.push(result.description);
      });
    
      }
  
   clearCanvasForRedraw(){
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.clearRect(0,0,canvasEl.width,canvasEl.height);
    this.drawItems.splice(0,this.drawItems.length);

    this.labellingData.splice(0,this.labellingData.length);
    this.labelsInfo.splice(0,this.labelsInfo.length);
    this.pascalvocmodel.labelInfo.splice(0, this.pascalvocmodel.labelInfo.length);
   }
    
    ngAfterViewInit() {
      // get the context
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');
  
      // set the width and height
      canvasEl.width = this.width;
      canvasEl.height = this.height;
  
      // set some default properties about the line
      this.cx.lineWidth = 3;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = '#000';
      // we'll implement this method to start capturing mouse events
      this.captureEvents(canvasEl);
    }
  
    captureEvents(canvasEl: HTMLCanvasElement) {
     const rect = canvasEl.getBoundingClientRect();
     let startX = 0;
     let startY = 0;
     let lastMousePosX =0;
     let lastMousePosY =0;
     fromEvent(canvasEl, 'mousemove').subscribe((e:MouseEvent) => {
        console.log("event:mouse move right")
        this.tooltipspan.nativeElement.style.cssText =
                    `left:` + Number(e.pageX -25 ) +`px;`  + 
                    `top:` + Number(e.pageY - 50) +`px;` +
                    `outline: 1px solid yellow;
                     opacity: 0.5;
                     position: absolute;
                     display: block;
                    `
        this.renderer.setProperty(this.tooltipspan.nativeElement, 'innerHTML', "x:" + Number(e.pageX - rect.left) +
                             "<br> y:" + Number( e.pageY - rect.top));
                  
        //.html();
      });

      fromEvent(canvasEl, 'mouseup').subscribe((e) => {
        console.log("event:mouse leave up")
        this.drawItems.push({
            x0: startX,
            x1: lastMousePosX,
            y0: startY,
            y1: lastMousePosY
          });
        this.labellingData.push({
              xmin: startX,
              xmax: lastMousePosX,
              ymin: startY,
              ymax: lastMousePosY
        });
     
        for(var i=0; i<this.drawItems.length; i++) {
          this.cx.beginPath();
          
          this.cx.strokeRect(this.drawItems[i].x0, this.drawItems[i].y0, 
                                  this.drawItems[i].x1, this.drawItems[i].y1);
          this.cx.fillStyle = 'black';
          this.cx.fill();
          this.cx.stroke();                
          
          this.cx.beginPath();
          this.cx.arc(this.drawItems[i].x0, this.drawItems[i].y0, 5, 0, 2 * Math.PI, false);
          this.cx.fillText("Label" + i, this.drawItems[i].x0, this.drawItems[i].y0 -5);
          
          this.cx.fillStyle = 'green';
          this.cx.fill();
          
          this.cx.beginPath();
          
          this.cx.arc(this.drawItems[i].x0,
            (this.drawItems[i].y1 +this.drawItems[i].y0), 5, 0, 2 * Math.PI, false);
          this.cx.fillStyle = 'green';
          this.cx.fill();
          
          this.cx.beginPath();
            this.cx.arc((this.drawItems[i].x1 + this.drawItems[i].x0),
                            (this.drawItems[i].y0), 5, 0, 2 * Math.PI, false);
          this.cx.fillStyle = 'green';
          this.cx.fill();
          
          this.cx.beginPath();
          this.cx.arc((this.drawItems[i].x1 + this.drawItems[i].x0),
                    (this.drawItems[i].y1 +this.drawItems[i].y0), 5, 0, 2 * Math.PI, false);
          this.cx.fillStyle = 'green';
          this.cx.fill();
                    
          
      }
        
        this.pascalvocmodel.setLabellingData( this.labellingData);
        this.openDialog();
       
      });
      // this will capture all mousedown events from teh canvas element
      this.drawingSubscription = fromEvent(canvasEl, 'mousedown')
        .pipe(
          switchMap((e:MouseEvent) => {
            // after a mouse down, we'll record all mouse moves
            console.log('mouse down');
            startX = e.pageX - rect.left;
            startY = e.pageY - rect.top;
    
            return fromEvent(canvasEl, 'mousemove').pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
          })
        )
        .subscribe((res: [MouseEvent, MouseEvent]) => {
         
          // previous and current position with the offset
          const prevPos = {
            x: res[0].pageX - rect.left,
            y: res[0].pageY - rect.top
          };
  
          const currentPos = {
            x: prevPos.x - startX,
            y: prevPos.y - startY
          };
  
          const startPosition ={
              x: startX,
              y: startY
          } 
          lastMousePosX  = currentPos.x;
          lastMousePosY = currentPos.y;
          // this method we'll implement soon to do the actual drawing
          this.drawOnCanvas(startPosition, currentPos, canvasEl);
          
        });
    }
  
    drawOnCanvas(
      prevPos: { x: number; y: number },
      currentPos: { x: number; y: number }, canvasEl
    ) {
      // incase the context is not set
      if (!this.cx) {
        return;
      }
  
      // start our drawing path
      this.cx.beginPath();
  
      // we're drawing lines so we need a previous position
      if (prevPos) {
        // sets the start point
        this.cx.clearRect(prevPos.x, prevPos.y,currentPos.x, currentPos.y);
       
        this.cx.rect(prevPos.x, prevPos.y,currentPos.x, currentPos.y);
        // strokes the current path with the styles we set earlier
        this.cx.stroke();
      }
    }
    
    ngOnDestroy() {
      // this will remove event lister when this component is destroyed
      this.drawingSubscription.unsubscribe();
    }
  }