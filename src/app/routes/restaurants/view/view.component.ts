import { Component, OnInit } from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid-community';
import { RestaurantService } from '@shared/services/restaurant.service';
import { CustomStatusRenderComponent } from '@shared/components/grid/custom-status-render/custom-status-render.component';
import { CustomSnoRenderComponent } from '@shared/components/grid/custom-sno-render/custom-sno-render.component';
import { ToastrService } from 'ngx-toastr';

import { CustomTranslateService } from '@shared/providers/custom-translate-service';
import { CustomActionsComponent } from '@shared/components/grid/custom-actions/custom-actions.component';
import { AgActionsRendererComponent } from '@shared/components/grid/ag-actions-renderer/ag-actions-renderer.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class RestaurantsViewComponent implements OnInit {


  gridOptions: GridOptions;

  data: any;


  constructor(
    private _restaurantService: RestaurantService,
    private toastr: ToastrService,
    private customTranslateService: CustomTranslateService,
    private router:Router,
    public matDialog: MatDialog) {

    console.log(this.customTranslateService.getKey('101.name'));
  }

  ngOnInit() {
    this.initGrid();
    // this.toastr.success('Hello world!', 'Toastr fun!',{
    //   closeButton:true
    // });
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
        customStatusRenderComponent: CustomStatusRenderComponent,
        customActionsComponent: CustomActionsComponent,
        agActionsRendererComponent: AgActionsRendererComponent
      },
      onGridReady: (event) => {
        this.prepareGridData(event);
        event.api.sizeColumnsToFit();
      }
    }
  }

  openFruitDialog() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: "Delete",
      message: 'Are you sure you want to delete ?'
    };

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

    // const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  onAgActionsBtnClick(e) {
    console.log(e);
    if (e.type == 'delete') {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        title: "Delete",
        message: 'Are you sure you want to delete ?'
      };
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result=='ok')
        {
          let msg = this.customTranslateService.getKey('msg_restaurnat_deleted_success');
          this.toastr.success(msg["message"], msg["name"], {
            closeButton: true
          });

          this.bindRestaurantDetails();

        }
        console.log(result);
      });


      // this._restaurantService.deleteRestruant(e.node.data._id).subscribe(
      //   response => {
      //     console.log(response);
          //this.bindRestaurantDetails();
      //   },
      //   err => console.error(err),
      //   () => console.log('done deleting restaurant details')
      // );
    }
    else
    if (e.type == 'edit') {
      this.router.navigateByUrl('/restaurants/edit/'+e.node.data._id);
    }
  }

  prepareGridData(event) {
    const headerArr: ColDef[] = [
      { headerName: "Sno", cellRenderer: "customSnoRenderComponent", maxWidth: 50 },
      { field: 'name', headerName: "Restaurant Name" },
      { field: 'email', headerName: "Email" },
      { field: 'mobile', headerName: "Contact" },
      { field: 'status', headerName: "Approval Status", cellRenderer: "customStatusRenderComponent" },
      { field: 'emailStatus', headerName: "Email Verification", cellRenderer: "customStatusRenderComponent" },
      {
        field: 'Action', headerName: "Action", cellRenderer: "agActionsRendererComponent",
        cellRendererParams: { onClick: this.onAgActionsBtnClick.bind(this) }, maxWidth: 120
      }
    ]
    this.gridOptions.api.setColumnDefs(headerArr);
    this.bindRestaurantDetails();
  }

  bindRestaurantDetails()
  {
    this._restaurantService.getRestruants().subscribe(
      response => {
        console.log(response);
        this.data = response["data"];
        this.gridOptions.api.setRowData(this.data);
        this.gridOptions.api.sizeColumnsToFit();
      },
      err => console.error(err),
      () => console.log('done loading foods')
    );
  }

}
