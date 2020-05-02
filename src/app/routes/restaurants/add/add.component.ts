import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '@shared/services/restaurant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { CustomTranslateService } from '@shared/providers/custom-translate-service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-restaurants-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class RestaurantsAddComponent implements OnInit {

  restaurantForm: FormGroup;
  restaurantUploadForm: FormGroup;
  _id;
  existingRestaurantDetails:any;
  //mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _restaurantService: RestaurantService,
    private toastr: ToastrService,
    private customTranslateService: CustomTranslateService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {

    this.restaurantForm = this.fb.group({
      restaurnatName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required]]
    });

    this.restaurantUploadForm = this.fb.group({
      name: ['', [Validators.required]]
    });


  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this._id=params['id'];
    });

    if(this._id)
    {
      this.initEditRestaurant();
    }
  }

  initEditRestaurant()
  {
    this._restaurantService.getRestruantById(this._id).subscribe(
      response => {
        console.log(response);
        this.existingRestaurantDetails=response["data"];
        this.restaurantForm.controls["restaurnatName"].setValue(this.existingRestaurantDetails.name);
        this.restaurantForm.controls["email"].setValue(this.existingRestaurantDetails.email);
        this.restaurantForm.controls["password"].setValue(this.existingRestaurantDetails.password);
        this.restaurantForm.controls["confirmPassword"].setValue(this.existingRestaurantDetails.password);
        this.restaurantForm.controls["mobile"].setValue(this.existingRestaurantDetails.mobile);
        this.restaurantForm.controls["address"].setValue(this.existingRestaurantDetails.address);
      },
      err => console.error(err),
      () => console.log('done loading restaurant details')
    );
  }
 


  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }


  onAdd() {


    let data = {
      name: this.restaurantForm.get('restaurnatName').value,
      email: this.restaurantForm.get('email').value,
      password: this.restaurantForm.get('password').value,
      mobile: this.restaurantForm.get('mobile').value,
      address: this.restaurantForm.get('address').value,
      isApproved: false,
      isEmailVerified: false,
      isActive: true,
      isDeleted: false
    }
    console.log(data);

    if(this._id)
    {
      this._restaurantService.updateRestruant(this._id,data).subscribe(
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
        () => console.log('done creating restaurants')
      );
    }
    else
    {
      this._restaurantService.createRestruant(data).subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl('/restaurants/view');
          let msg = this.customTranslateService.getKey('msg_restaurnat_created_success');
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
        () => console.log('done creating restaurants')
      );
    }
    


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
