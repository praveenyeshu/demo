import { Component, Output, EventEmitter } from "@angular/core";
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { RestaurantService } from '@shared/services/restaurant.service';

@Component({
    selector:'custom-actions',
    templateUrl:'./custom-actions.component.html',
    styleUrls:['custom-actions.component.scss']
})

export class CustomActionsComponent implements ICellEditorAngularComp{
    private params:ICellEditorParams;
    private initialData:any;
    public value:any;
    

    // @Output() edit: EventEmitter<any> = new EventEmitter();

    // @Output() delete: EventEmitter<any> = new EventEmitter();

    constructor(private router:Router,
        private _restaurantService: RestaurantService){

    }
    agInit(params:ICellEditorParams):void{
        this.params=params;
        this.initialData=JSON.parse(JSON.stringify(params.data));
        this.value=params.value;
        
    }


    getValue() {
        console.log(this.value);
        this.value;
    }

    onDelete()
    {
        console.log(this.initialData);

        this._restaurantService.deleteRestruant(this.initialData._id).subscribe(
            response => {
                console.log(response);
            },
            err => console.error(err),
            () => console.log('done deleting restaurant details')
          );        
    }

    onEdit()
    {
        console.log('/restaurants/edit/'+this.initialData._id);
        console.log(this.initialData);
        this.router.navigateByUrl('/restaurants/edit/'+this.initialData._id);
    }

}