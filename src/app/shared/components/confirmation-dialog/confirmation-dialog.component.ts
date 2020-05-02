import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {

   @Input() title: string;
   @Input() message: string;

//    @Output() ok: EventEmitter<any> = new EventEmitter();


//   @Input() btnOkText: string;
//   @Input() btnCancelText: string;

//   constructor() { }

  ngOnInit() {
    // this.title="Delete";
    // this.message="Are you sure you want to delete ?";
  }

//   public decline() {
//         this.ok.emit();
//     }

}
