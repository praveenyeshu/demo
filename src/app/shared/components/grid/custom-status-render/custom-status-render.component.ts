import { Component } from "@angular/core";
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
    selector:'custom-status-render',
    templateUrl:'./custom-status-render.component.html',
    styleUrls:['custom-status-render.component.scss']
})

export class CustomStatusRenderComponent implements ICellEditorAngularComp{
    private params:ICellEditorParams;
    private initialData:any;
    public value:any;
    public headerName:any;
    
    agInit(params:ICellEditorParams):void{
        this.params=params;
        this.initialData=JSON.parse(JSON.stringify(params.data));
        this.value=params.value;
        this.headerName=params.colDef.headerName;
        console.log(this.headerName);
    }


    getValue() {
        console.log(this.value);
        this.value;
    }

}