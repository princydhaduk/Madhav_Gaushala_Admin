import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../../common/global-function';
import { Editor, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONSTANTS } from '../../../common/constants';
import { RoomService } from '../room.service';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  //styleUrls: [: './add-edit-room.component.scss'
})
export class AddEditRoomComponent {

  roomNumberList: any = [];
  amenitiesList: any = [];
  editor!: Editor;
  editor2!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  tremCondition_length: any = 0;
  description_length: any = 0;

  isBtnLoading: boolean = false;
  roomsForm: any = FormGroup;
  @ViewChild('roomsNgForm') roomsNgForm: any;
  constants: any = CONSTANTS;
  OtherImages: any[] = [];
  roomId: any;
  pageType: any = "Add";
  isLoading: boolean = false;
  @ViewChild('allSelected') allSelected: MatOption | any;
  totalPrice: number = 0;


  constructor(
    private _roomService: RoomService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.extraPersonValidate();
    this.editor = new Editor();
    this.editor2 = new Editor();
    this.getRoomAmenitiesList();
    this.getRoomNumberList();
    this.roomId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.roomId && this.roomId != "roomsdetails") {
      this.pageType = "Edit";
      this.setRoomsData();
    }
  }

  initForm() {
    this.roomsForm = this.fb.group({
      room_name: ["", Validators.required],
      room_size: ["", Validators.required],
      bed_type: ["", Validators.required],
      // numbers_of_room: ["", [Validators.pattern(/^[.\d]+$/)]],
      no_of_adults: ["", [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      no_of_child: ["", [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      no_of_extra: [0, [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      show_price: [false],
      price: [0, [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      gst: [0, [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      pricewithgst: [0, [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      show_extra_price: [false],
      extra_price: [0],
      extra_gst: [0],
      extra_pricewithgst: [0],
      show_breakfast_price: [false],
      breakfast_price: [0],
      breakfast_gst: [0],
      breakfast_pricewithgst: [0],
      description: [""],
      terms_and_policy: [""],
      amenities: [null, Validators.required],
      roomnumberids: [null, Validators.required],
      photos_videos: [null],
      meta_title: [""],
      url_slug: [""],
      canonical: [""],
      og_title: [""],
      og_description: [""],
      og_url: [""],
      og_type: [""],
      og_sitename: [""],
      meta_description: [""],
    });
  }

  togglePerOne(all: any): any {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.roomsForm.controls.amenities.value.length == this.amenitiesList.length)
      this.allSelected.select();
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.roomsForm.controls.amenities.setValue([...this.amenitiesList.map((item: any) => item._id), 0]);
    } else {
      this.roomsForm.controls.amenities.setValue([]);
    }
  }

  getRoomAmenitiesList() {
    // this._amenitiesService.getAmenitiesWithoutPagination().subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     this.amenitiesList = result?.Data;
    //   } else {
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    // }, (error: any) => {
    //   this._globalFunctions.errorHanding(error, this, true);
    // });
  }

  getRoomNumberList() {
    // this._roomNumbersService.getRoomNumberWithoutPagination().subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     result?.Data.map((i: any) => {
    //       this.roomNumberList.push(i);
    //     })
    //   } else {
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    // }, (error: any) => {
    //   this._globalFunctions.errorHanding(error, this, true);
    // });
  }

  setRoomsData() {
    let param = {
      roomid: this.roomId
    }
    this._roomService.getRoomsById(param).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.roomsForm.get('room_name').setValue(result.Data.room_name);
        let roomNumberIds: any = [];
        result.Data.allroomnumbers.map((i: any) => {
          this.roomNumberList.push(i.roomnumberid);
          roomNumberIds.push(i.roomnumberid._id);
        });
        this.roomsForm.get('roomnumberids').setValue(roomNumberIds);
        this.roomsForm.get('room_size').setValue(result.Data.room_size);
        this.roomsForm.get('bed_type').setValue(result.Data.bed_type);
        this.roomsForm.get('no_of_adults').setValue(result.Data.no_of_adults);
        this.roomsForm.get('no_of_child').setValue(result.Data.no_of_child);
        this.roomsForm.get('no_of_extra').setValue(result.Data.no_of_extra || 0);

        let amenitiesIds = result.Data.amenities.map((i: any) => i.amenityid);
        this.roomsForm.get('amenities')?.setValue(amenitiesIds);
        setTimeout(() => {
          if (amenitiesIds.length === this.amenitiesList.length) {
            this.allSelected?.select();
          } else {
            this.allSelected?.deselect();
          }
        });
        this.roomsForm.get('show_price').setValue(result.Data.show_price || false);
        this.roomsForm.get('price').setValue(result.Data.price);
        this.roomsForm.get('gst').setValue(result.Data.gst);
        this.roomsForm.get('pricewithgst').setValue(result.Data.pricewithgst);
        this.roomsForm.get('show_extra_price').setValue(result.Data.show_extra_price || false);
        this.roomsForm.get('extra_price').setValue(result.Data.extra_price);
        this.roomsForm.get('extra_gst').setValue(result.Data.extra_gst);
        this.roomsForm.get('extra_pricewithgst').setValue(result.Data.extra_pricewithgst);
        this.roomsForm.get('show_breakfast_price').setValue(result.Data.show_breakfast_price || false);
        this.roomsForm.get('breakfast_price').setValue(result.Data.breakfast_price);
        this.roomsForm.get('breakfast_gst').setValue(result.Data.breakfast_gst);
        this.roomsForm.get('breakfast_pricewithgst').setValue(result.Data.breakfast_pricewithgst);
        this.roomsForm.get('description').setValue(result.Data.description);
        this.roomsForm.get('terms_and_policy').setValue(result.Data.terms_and_policy);
        this.OtherImages = result.Data.photos_videos;
        this.roomsForm.get('meta_title').setValue(result.Data.meta_title);
        this.roomsForm.get('url_slug').setValue(result.Data.url_slug);
        this.roomsForm.get('canonical').setValue(result.Data.canonical);
        this.roomsForm.get('og_title').setValue(result.Data.og_title);
        this.roomsForm.get('og_description').setValue(result.Data.og_description);
        this.roomsForm.get('og_url').setValue(result.Data.og_url);
        this.roomsForm.get('og_type').setValue(result.Data.og_type);
        this.roomsForm.get('og_sitename').setValue(result.Data.og_sitename);
        this.roomsForm.get('meta_description').setValue(result.Data.meta_description);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isLoading = false;
      this._globalFunctions.errorHanding(error, this, true)
    });
  }

  termsConditionLength(event: any = '') {
    this.tremCondition_length = event.length
    if (event.length > 10000) {
      this._toastr.clear();
      this._toastr.error("You can not write more terms and condition", 'Oops!');
    }

  }

  descriptionLength(event: any = '') {
    this.description_length = event.length
    if (event.length > 10000) {
      this._toastr.clear();
      this._toastr.error("You can not write more description", 'Oops!');
    }
  }

  uploadOtherImages(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length <= 5) {
        // if ((event.target.files.length + this.OtherImages.length) > 5) {
        //   this._toastr.clear();
        //   this._toastr.error('Please upload maximum 5 images', 'Error');
        //   return;
        // }
        let count = 0;
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          let type = file.type.split('/')[0];
          if (type == "image") {
            if (!this.constants.imagearray.includes(file.type)) {
              count++;
            }
          } else if (type == "video") {
            if (!this.constants.videoarray.includes(file.type)) {
              count++;
            }
          }
        }
        if (count > 0) {
          this._toastr.clear();
          this._toastr.error(
            'File type is not allowed.',
            'Error'
          );
          count = 0;
          return;
        }
        const fileObj: any = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          fileObj.append('files', file);
        }
        this._roomService.multiFileUpload(fileObj).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            let res = result.Data;
            res.map((item: any) => {
              this.OtherImages.push(item);
            });
            this._toastr.clear();
            this._toastr.success(result.Message, 'success');
          } else {
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this._globalFunctions.errorHanding(error, this, true);
        })
      } else {
        this._toastr.clear();
        this._toastr.error('Please upload maximum 5 images', 'Error');
      }
    }
  }

  imageOnError(event: any) {
    event.target.src = this.constants.defaultImage;
  }

  removeOtherImnages(index: any) {
    this.OtherImages.splice(index, 1)
  }

  get f() {
    return this.roomsForm.controls;
  }

  extraPersonValidate() {
    this.roomsForm.get('no_of_extra')?.valueChanges.subscribe((value: any) => {
      // const memberCodeControl = this.roomsForm.get('monthly_price_for_member');
      if (value > 0) {
        this.roomsForm.get('extra_price')?.setValidators([Validators.required, Validators.pattern(/^[.\d]+$/)]);
        this.roomsForm.get('extra_gst')?.setValidators([Validators.required, Validators.pattern(/^[.\d]+$/)]);
        this.roomsForm.get('extra_pricewithgst')?.setValidators([Validators.required, Validators.pattern(/^[.\d]+$/)]);
      } else {
        this.roomsForm.get('extra_price')?.setValidators([Validators.pattern(/^[.\d]+$/)]);
        this.roomsForm.get('extra_gst')?.setValidators([Validators.pattern(/^[.\d]+$/)]);
        this.roomsForm.get('extra_pricewithgst')?.setValidators([Validators.pattern(/^[.\d]+$/)]);
      }
      this.roomsForm?.updateValueAndValidity();
    });
  }

  calculatePrice(type: any) {
    if (type == 'price') {
      const price = parseFloat(this.roomsForm.get('price').value);
      const gst_per = parseFloat(this.roomsForm.get('gst').value);
      const gst = (price * gst_per) / 100;
      this.totalPrice = price + gst;
      this.roomsForm.get('pricewithgst').setValue(this.totalPrice.toFixed(2));
    } else if (type == 'extraprice') {
      const price = parseFloat(this.roomsForm.get('extra_price').value);
      const gst_per = parseFloat(this.roomsForm.get('extra_gst').value);
      const gst = (price * gst_per) / 100;
      this.totalPrice = price + gst;
      this.roomsForm.get('extra_pricewithgst').setValue(this.totalPrice.toFixed(2));
    } else if (type == 'breakfastprice') {
      const price = parseFloat(this.roomsForm.get('breakfast_price').value);
      const gst_per = parseFloat(this.roomsForm.get('breakfast_gst').value);
      const gst = (price * gst_per) / 100;
      this.totalPrice = price + gst;
      this.roomsForm.get('breakfast_pricewithgst').setValue(this.totalPrice.toFixed(2));
    }
  }

  onSubmitAction(): void {
    this.isBtnLoading = true;

    if (this.OtherImages.length == 0) {
      this._toastr.clear();
      this._toastr.error("Please enter at least one photo/video.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }

    if (!this.roomsForm.valid) {
      this._toastr.clear();
      this._toastr.error("Please enter valid data.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }
    let allAmenities = this.roomsForm?.value?.amenities?.filter((index: any) => index != 0);
    const catDataObj: any = {
      roomid: this.roomId !== "roomsdetails" ? this.roomId : '',
      room_name: this.roomsForm.value.room_name || "",
      roomnumberids: this.roomsForm.value.roomnumberids || "",
      // numbers_of_room: parseInt(this.roomsForm.value.numbers_of_room) || 0,
      no_of_adults: parseInt(this.roomsForm.value.no_of_adults) || 0,
      no_of_child: parseInt(this.roomsForm.value.no_of_child) || 0,
      no_of_extra: parseInt(this.roomsForm.value.no_of_extra) || 0,
      show_price: this.roomsForm.value.show_price ? true : false,
      price: parseInt(this.roomsForm.value.price) || 0,
      gst: parseInt(this.roomsForm.value.gst) || 0,
      pricewithgst: parseInt(this.roomsForm.value.pricewithgst) || 0,
      show_extra_price: this.roomsForm.value.show_extra_price ? true : false,
      extra_price: parseInt(this.roomsForm.value.extra_price) || 0,
      extra_gst: parseInt(this.roomsForm.value.extra_gst) || 0,
      extra_pricewithgst: parseInt(this.roomsForm.value.extra_pricewithgst) || 0,
      show_breakfast_price: this.roomsForm.value.show_breakfast_price ? true : false,
      breakfast_price: parseInt(this.roomsForm.value.breakfast_price) || 0,
      breakfast_gst: parseInt(this.roomsForm.value.breakfast_gst) || 0,
      breakfast_pricewithgst: parseInt(this.roomsForm.value.breakfast_pricewithgst) || 0,
      room_size: this.roomsForm.value.room_size || "",
      amenities: allAmenities || [],
      bed_type: this.roomsForm.value.bed_type || "",
      description: this.roomsForm.value.description ?? '',
      terms_and_policy: this.roomsForm.value.terms_and_policy ?? '',
      photos_videos: this.OtherImages ?? [],
      meta_title: this.roomsForm.value.meta_title || "",
      url_slug: this.roomsForm.value.url_slug || "",
      canonical: this.roomsForm.value.canonical || "",
      og_title: this.roomsForm.value.og_title || "",
      og_description: this.roomsForm.value.og_description || "",
      og_url: this.roomsForm.value.og_url || "",
      og_type: this.roomsForm.value.og_type || "",
      og_sitename: this.roomsForm.value.og_sitename || "",
      meta_description: this.roomsForm.value.meta_description || "",
    };
    this.roomsForm.disable();
    this._roomService.addEditRooms(catDataObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this._router.navigate(['rooms']);
        this.isBtnLoading = false;
      } else {
        this.roomsForm.enable();
        this._globalFunctions.successErrorHandling(result, this, true);
        this.isBtnLoading = false;
      }
    }, (error: any) => {
      this.roomsForm.enable();
      this._globalFunctions.errorHanding(error, this, true);
      this.isBtnLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy(); // Prevent memory leaks
    this.editor2.destroy(); // Prevent memory leaks
  }

}
