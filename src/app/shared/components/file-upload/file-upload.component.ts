import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  HttpClient, HttpResponse, HttpRequest,
  HttpEventType, HttpErrorResponse
} from '@angular/common/http';

import { of, Subscription } from 'rxjs';
import { RestaurantService } from '@shared/services/restaurant.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() upload=new EventEmitter();
  uploadedFiles: Array<File>;

  constructor(private http: HttpClient,
    private _restaurantService: RestaurantService, ) {

  }

  ngOnInit() {

  }
  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  onUpload() {

    this.upload.emit({
      files:this.uploadedFiles
    })

    // let formData = new FormData();
    // for (var i = 0; i < this.uploadedFiles.length; i++) {
    //   formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
    // }
    // console.log(formData);


    // this._restaurantService.ImportRestruants(formData).subscribe(
    //   response => {
    //     console.log(response);
    //     // this.data = response["data"];
    //     // this.gridOptions.api.setRowData(this.data);
    //     // this.gridOptions.api.sizeColumnsToFit();
    //   },
    //   err => console.error(err),
    //   () => console.log('done upoading foods')
    // );


    // this.http.post('/api/upload', formData)
    // .subscribe((response)=>{
    //   console.log('response receved is ', response);
    // })
  }

}
