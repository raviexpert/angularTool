import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TrackingLines } from 'src/app/TrackingLines';
import {DrawingComponent} from './DrawingComponent';
import {ImageLabelDialog} from './ImageLabelDialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageViewerModule } from 'ng2-image-viewer';
import {MatInputModule} from '@angular/material';

import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule, MatFormFieldModule } from "@angular/material";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {HttpComponent} from './HttpComponent';

@NgModule({
  declarations: [
    AppComponent,
    TrackingLines,
    DrawingComponent,
    ImageLabelDialog,
    HttpComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ImageViewerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AlifeFileToBase64Module,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  entryComponents: [ImageLabelDialog],
  
  providers: [HttpClientModule
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
