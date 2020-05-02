import { Component } from "@angular/core";
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
    selector:'custom-sno-render',
    templateUrl:'./custom-sno-render.component.html',
    styleUrls:['custom-sno-render.component.scss']
})

export class CustomSnoRenderComponent implements ICellEditorAngularComp{
    private params:ICellEditorParams;
    private initialData:any;
    public value:any;
    
    agInit(params:ICellEditorParams):void{
        console.log(params);
        this.params=params;
        this.initialData=JSON.parse(JSON.stringify(params.data));
        this.value=params.rowIndex+1;

    }


    getValue() {
        
        console.log(this.value);
        this.value;
    }

}