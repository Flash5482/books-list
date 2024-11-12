import { Injectable } from '@angular/core';
import {BaseFormService} from '../../../../../shared/services/base-form.service';
import {IBook} from '../../../interfaces/book';
import {FormBuilder, Validators} from '@angular/forms';
import {AddFormControl} from '../../../../../shared/enums/add-form-control';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseFormService<IBook>{

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  buildForm(): void {
    this.build({
      [AddFormControl.TITLE]: this.fb.control(null, Validators.required),
      [AddFormControl.ID]: this.fb.control(null),
      [AddFormControl.AUTHOR]: this.fb.control(null, Validators.required),
      [AddFormControl.YEAR]: this.fb.control(null, Validators.required),
      [AddFormControl.DESCrIPtION]: this.fb.control(null, Validators.required),
      [AddFormControl.IMG]: this.fb.control(null),
    });
  }
}
