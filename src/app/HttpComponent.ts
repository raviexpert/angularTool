import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-html',
  template: `
  <body style="margin:0px;padding:0px;overflow:hidden">
  <iframe src="http://ec2-52-25-206-225.us-west-2.compute.amazonaws.com/imglab/index.html" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:80%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>
</body>
  `
})
export class HttpComponent {
  private myTemplate: any = '';
  yt = '';
  
  constructor(http: HttpClient,  private sanitizer: DomSanitizer) {
  }
}