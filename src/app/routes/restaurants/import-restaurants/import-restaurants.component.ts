import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '@shared/services/restaurant.service';
import { GridOptions, ColDef } from 'ag-grid-community';
import { CustomSnoRenderComponent } from '@shared/components/grid/custom-sno-render/custom-sno-render.component';
import { ImportStatusRendererComponent } from '@shared/components/grid/import-status-renderer/import-status-renderer.component';
import { CustomTranslateService } from '@shared/providers/custom-translate-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-import-restaurants',
  templateUrl: './import-restaurants.component.html',
  styleUrls: ['./import-restaurants.component.scss']
})
export class RestaurantsImportRestaurantsComponent implements OnInit {

  panel1: any;
  restaurantUploadForm: FormGroup;
  gridOptions: GridOptions;
  uploadedFiles: Array<File>;
  importedData: any = [];
  isImported = false;
  disableSave = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _restaurantService: RestaurantService,
    private customTranslateService: CustomTranslateService,
    private router: Router,
  ) {
    this.restaurantUploadForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initGrid();
  }

  initGrid() {
    this.gridOptions = <GridOptions>{

      // pagination
      pagination: true,
      paginationPageSize: 10,

      defaultColDef: {
        filter: true, // set filtering on for all cols
        resizable: true
      },
      frameworkComponents: {
        customSnoRenderComponent: CustomSnoRenderComponent,
        importStatusRendererComponent: ImportStatusRendererComponent
      },
      // getRowStyle : function(params) {
      //   console.debug("getRowClass")
      //   console.debug(params)
      //   if (!params.node.data.isValid) {
      //       // return 'my-shaded-effect';
      //       return {  background: 'lightcoral' };
      //   }
      // },
      onGridReady: (event) => {
        this.prepareGridData(event);
        event.api.sizeColumnsToFit();
      }
    }
  }
  prepareGridData(event) {
    const headerArr: ColDef[] = [
      { headerName: "Sno", cellRenderer: "customSnoRenderComponent", maxWidth: 50 },
      { field: 'name', headerName: "Restaurant Name" },
      { field: 'email', headerName: "Email" },
      { field: 'password', headerName: "Password" },
      { field: 'mobile', headerName: "Contact" },
      { field: 'address', headerName: "Address" },
      { field: 'status', headerName: "Status", cellRenderer: "importStatusRendererComponent" }
    ]
    this.gridOptions.api.setColumnDefs(headerArr);

  }



  onSaveAll() {
    this._restaurantService.ImportRestruantsSave(this.importedData).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl('/restaurants/view');
        let msg = this.customTranslateService.getKey('msg_restaurnat_updated_success');
        this.toastr.success(msg["message"], msg["name"], {
          closeButton: true
        });
      },
      err => {
        console.error(err);
        let msg = this.customTranslateService.getKey(err.error.statusCode.toString());
        this.toastr.error(msg["message"], msg["name"], {
          closeButton: true
        });
      },
      () => console.log('done upoading foods')
    );

  }
  onCancel() {
    this.router.navigateByUrl('/restaurants/view');
  }


  upload(data) {
    console.log('upload')
    console.log(data);


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

  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }


  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  onUpload() {




    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    console.log(formData);


    this._restaurantService.ImportRestruants(formData).subscribe(
      response => {
        console.log(response);
        this.isImported = true;
        this.uploadedFiles = [];
        this.importedData = response["data"];

        this.disableSave = this.importedData.length > 0 ? this.importedData.some(e => !e.isValid) : true;

        this.gridOptions.api.setRowData(this.importedData);
        this.gridOptions.api.sizeColumnsToFit();
        let msg = this.customTranslateService.getKey("msg_restaurnat_import_success");
        this.toastr.success(msg["message"], msg["name"], {
          closeButton: true
        });
      },
      err => {
        console.error(err);
        let msg = this.customTranslateService.getKey(err.error.statusCode.toString());
        this.toastr.error(msg["message"], msg["name"], {
          closeButton: true
        });
      },
      () => console.log('done upoading foods')
    );


    // this.http.post('/api/upload', formData)
    // .subscribe((response)=>{
    //   console.log('response receved is ', response);
    // })
  }

  downloadfile() {

    let thefile = {};
    this._restaurantService.downloadRestaurantTemplate()
      .subscribe(data => {
        console.log(data);
        thefile = new Blob([data], { type: 'application/octet-stream' });

        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "RestaurnatTemplate.xlsx";
        link.click();

      });
    //  thefile = new Blob([data], { type: "application/octet-stream" }


    //       ), //console.log(data),
    //                 error => console.log("Error downloading the file."),
    //                 () => console.log('Completed file download.'));

    // let url = window.URL.createObjectURL(thefile);
    // window.open(url);
  }

}
