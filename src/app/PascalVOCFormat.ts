
import { PascalVOCModel } from "src/app/PascalVOCModel";


export class PascalVOCFormat{

pascalvoc: PascalVOCModel;

constructor(pascalvoc: PascalVOCModel){
    this.pascalvoc = pascalvoc;
}


toPascalVOC (currentImageIndex){
    var exportData = `<?xml version="1.0"?>
    <annotation>`;
        var imageprops = this.pascalvoc.imageDimensions[ currentImageIndex ];
        exportData += `
                <folder>images</folder>
                <filename>` +imageprops.imgName +`</filename>
                <path>images/`+ this.pascalvoc.pathOfImages +`</path>
                <source>
                    <database>Unknown</database>
                </source>
                <size>
                    <width>`+imageprops.imgWidth+`</width>
                    <height>`+imageprops.imgHeight+`</height>
                    <depth>3</depth>
                </size>
                <segmented>0</segmented>`
            //Add images
        for(var shape_i = 0 ; shape_i < this.pascalvoc.labellingData.length; shape_i++){
                var shape = this.pascalvoc.labellingData[ shape_i ];
                shape.label = this.pascalvoc.labelInfo[shape_i];
                exportData += `
                <object>
                    <name>`+shape.label +`</name>
                    <pose>Unspecified</pose>
                    <truncated>0</truncated>
                    <difficult>0</difficult>
                    <bndbox>
                        <xmin>`+ shape.xmin +`</xmin>
                        <ymin>` + shape.ymin + `</ymin>
                        <xmax>` + (Number(shape.xmin) + Number (shape.xmax)) +`</xmax>
                        <ymax>` + (Number(shape.ymin)  + Number(shape.ymax)) +`</ymax>
                    </bndbox>
                </object>`;
            }
            exportData += "\n</annotation>";
            return exportData;
        }

  }
