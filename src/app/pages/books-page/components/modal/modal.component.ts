import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model, OnInit, signal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {FormService} from './services/form.service';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {BooksService} from '../../services/books.service';
import {NgIf} from '@angular/common';
import {IBook} from '../../interfaces/book';
import {Mode} from '../../../../shared/enums/mode';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatFormFieldModule, MatInputModule, MatSelectModule, NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<{mode: Mode, book: IBook  }>(MAT_DIALOG_DATA);
  readonly mode = Mode;

  imageSrc: string | ArrayBuffer | null = null;

  booksService = inject(BooksService);

  get form(){
    return this.formService.form;
  }

  get valid(){
    return this.formService.valid;
  }

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.formService.buildForm();

    if(this.data.book){
      this.form.setValue(this.data.book)
    }
  }

  onAdd(){
    console.log('this.form.value', this.form.value);
   this.booksService.addBook(this.form.value);

    this.dialogRef.close();
  }

  onSave(){
    this.booksService.updateBook(this.form.value);

    this.dialogRef.close();
  }

  changeMode(){
    this.data.mode = this.mode.EDIT;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;

          // @ts-ignore
          this.form.controls['img'].setValue( reader.result);

          console.log(this.form.value);

        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
