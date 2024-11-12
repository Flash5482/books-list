import {FormBuilder, FormGroup} from '@angular/forms';

export class BaseFormService<T> {
  private _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  get value(): T {
    return this.form?.value;
  }

  get valid(): boolean {
    return this.form?.valid;
  }

  set value(value: T) {
    // @ts-ignore
    this.form.patchValue(value, { emitEvent: false });
  }

  constructor(protected fb: FormBuilder) { }

  protected build(controlsConfig: { [key: string]: any; }): void {
    this._form = this.fb.group(controlsConfig);
  }
}
