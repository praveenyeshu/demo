import { Component, Output, EventEmitter } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector:'import-status-renderer-renderer',
    templateUrl:'./import-status-renderer.component.html',
    styleUrls:['import-status-renderer.component.scss']
})

export class ImportStatusRendererComponent implements ICellRendererAngularComp{
    public params;
    
    agInit(params):void{
        this.params=params;
        console.log("agInit");
        console.log(this.params);
    }
    refresh(params?:any):boolean{
        return true
    }
}