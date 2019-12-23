import { PascalVOCFormat } from "src/app/PascalVOCFormat";

export class PascalVOCModel{

    filename =[];
    pathOfImages : string;
    imageHeight : string;
    imageWidth: string;
    imageDimensions= [];
    labellingData = [];
    labelInfo =[];

    setLabelInformation(lblInfo){
        this.labelInfo = lblInfo;
    }

    getLabelInformation(){
        return this.labelInfo;
    }

    
    setImageDimensions(imgDimensions){
        this.imageDimensions = imgDimensions;
    }

    getImageDimensions(){
        return this.imageDimensions;
    }

    setImageFileName(imagefilename){
        this.filename = imagefilename;
    }

    getImageFileName(){
        return this.filename;
    }

    setPathOfImages(imagePath){
        this.pathOfImages = imagePath;
    }

    getPathOfImages(){
        return this.pathOfImages;
    }

    setImageHeight(imgHeight){
        this.imageHeight = imgHeight;
    }

    getImageHeight(){
        return this.imageHeight;
    }

    setImageWidth(imgWidth){
        this.imageWidth = imgWidth;
    }

    setLabellingData(lblData){
        this. labellingData = lblData;
    }
    
    getLabellingData(){
        return this.labellingData;
    }

  
}