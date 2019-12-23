import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import {PascalVOCFormat} from './PascalVOCFormat';
import {PascalVOCModel} from './PascalVOCModel';
import {DrawingComponent} from './DrawingComponent';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  @ViewChild(DrawingComponent) drawingcomp: DrawingComponent;
  base64Image = [];
  imageFileName = [];
  loadingdone = false;
  currentImageIndex =1;

  ngAfterViewInit() {
    console.log('On Save Pascal ngAfterViewInit Format'+this.currentImageIndex);
    
  }
  onSavePascalVOC(){
    console.log('On Save Pascal VOC Format'+this.drawingcomp.pascalvocmodel);
    let pascalvocformat = new PascalVOCFormat(this.drawingcomp.pascalvocmodel);
    let test = pascalvocformat.toPascalVOC(this.currentImageIndex-1);
    const blob = new Blob([test], { type: 'application/xml' });
    let xmlFileName = this.imageFileName[this.currentImageIndex-1]; 
    xmlFileName = xmlFileName.substring(0,xmlFileName.indexOf('.'));
    saveAs(blob, xmlFileName);
  }

  onNextImage(event){
    this.clearCanvas();
    this.currentImageIndex = event;
  }

  onPreviousImage(event){
    this.clearCanvas();
    this.currentImageIndex = event;
  }

  clearPASCALVOCModel(){

  }

  clearCanvas(){
    this.drawingcomp.clearCanvasForRedraw();
  }

  // PAC model
  // clear canvas 
  // clear all rectangles

  // Path specified
  // SAve XML to path

  // Canvas dynamic handling
  // change in view port 
  // zoom

  // Remove extra icons if any

  onFileChanges(event){
    console.log(event);
      let imgDimension = [];
      this.base64Image.splice(0,this.base64Image.length);
      this.loadingdone = false;
      for(let evtId =0; evtId < event.length; evtId++){
          let base64String = event[evtId].base64;
          this.imageFileName.push(event[evtId].name);
          let im = new Image;
          im.src = base64String;
          im.onload = () => {
            console.log(im.width)
            imgDimension.push({
              "imgWidth" : im.width,
              "imgHeight" : im.height,
              "imgName" : event[evtId].name
            });
          };
          //this.base64Image.push(base64String);
          this.drawingcomp.pascalvocmodel.setImageDimensions(imgDimension)
          base64String = base64String.substring(base64String.indexOf(',') +1);
          this.base64Image = [...this.base64Image, base64String];
          console.log('onFileChange');
      }
      this.loadingdone = true;
  }

  onOpenImageFile(){

  }

  onOpenImageFolder(){

  }
}
