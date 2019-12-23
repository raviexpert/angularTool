import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    Inject,
    NgZone
  } from '@angular/core';
  import { FormGroup,FormBuilder,FormControl } from "@angular/forms";
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
  
  @Component({
    selector: 'imagelabel',
    templateUrl: './ImageLabelDialog.html'
   
  })
  export class ImageLabelDialog implements AfterViewInit{

   form: FormGroup;
   description = new FormControl('')
   constructor(private ngZone: NgZone,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ImageLabelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.form = this.fb.group({description: this.description});
    }

    ngAfterViewInit() {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    closeDialog(){
        this.dialogRef.close();
    } 

    save(){
      this.dialogRef.close(this.form.value);
      
    }
  }