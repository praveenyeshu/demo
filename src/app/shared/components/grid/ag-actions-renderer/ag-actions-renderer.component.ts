import { Component, Output, EventEmitter } from "@angular/core";
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector:'ag-actions-renderer',
    templateUrl:'./ag-actions-renderer.component.html',
    styleUrls:['ag-actions-renderer.component.scss']
})

export class AgActionsRendererComponent implements ICellRendererAngularComp{
    private params;
    private labels:Array<string>;
    

    agInit(params):void{
        this.params=params;
        this.labels=this.params.labels || null;
    }
    refresh(params?:any):boolean{
        return true
    }
    onClick($event, type)
    {
        if(this.params.onClick instanceof Function)
        {
            const params = {
                event:$event,
                node:this.params.node,
                type: type
            }
            this.params.onClick(params);
        }
        
    }

}