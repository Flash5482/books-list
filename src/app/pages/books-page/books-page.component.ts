import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCardModule,
} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {BooksService} from './services/books.service';
import {CardComponent} from './components/card/card.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {AddCardComponent} from './components/add-card/add-card.component';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from './components/modal/modal.component';
import {IBook} from './interfaces/book';
import {Mode} from '../../shared/enums/mode';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatProgressBar, CardComponent, AsyncPipe, NgForOf, AddCardComponent, MatFormField, MatInput, MatIcon, MatLabel, FormsModule
  ],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksPageComponent implements OnInit{
  readonly booksService = inject(BooksService);
  readonly dialog = inject(MatDialog);

  searchQuery = signal('');

  books = this.booksService.books;

  filteredBooks = computed(() => this.books().filter(book =>
    book.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
    (book.author && book.author.toLowerCase().includes(this.searchQuery().toLowerCase()))
  ));

  ngOnInit(): void {
    this.booksService.getBook();
  }

  openModal(mode: Mode, book?: IBook){
    this.dialog.open(ModalComponent, {
      data: { book, mode }
    })
  }

  deleteBook(id: string | undefined){
    if(!id){
      return;
    }

    this.booksService.deleteBook(id);
  }
}
