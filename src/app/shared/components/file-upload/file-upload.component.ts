import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse } from '@angular/common/http';

import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

      uploadedFiles: Array<File>;

  constructor(private http : HttpClient){

  }
  
  ngOnInit(){
    
  }
      fileChange(element){
            this.uploadedFiles = element.target.files;
          }
        
          upload(){
            let formData = new FormData();
            for(var i = 0; i < this.uploadedFiles.length; i++) {
                formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
            }
            console.log(formData);
            // this.http.post('/api/upload', formData)
            // .subscribe((response)=>{
            //   console.log('response receved is ', response);
            // })
          }

}
