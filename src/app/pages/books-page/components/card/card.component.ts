import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {IBook} from '../../interfaces/book';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Mode} from '../../../../shared/enums/mode';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    NgClass,
    NgIf,
    MatIcon,
    MatFabButton
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  deleteBook = output<string | undefined>();
  openModal = output<{ mode: Mode, book: IBook | undefined }>();

  book = input<IBook>();

  openDetailsModal(book: IBook | undefined){
    this.openModal.emit({ mode: Mode.VIEW, book });
  }
}
