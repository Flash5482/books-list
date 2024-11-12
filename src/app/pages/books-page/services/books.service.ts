import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IBook} from '../interfaces/book';

@Injectable({
  providedIn: "root"
})
export class BooksService {
  http = inject(HttpClient);
  readonly basedUrl = 'http://localhost:3000/';

  books = signal([] as IBook[]);

  generateUniqueId(): string {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  getBook() {
    return this.http.get<IBook[]>(this.basedUrl + 'books').subscribe(rez => {
      this.books.set(rez);
    });
  }

  addBook(book: IBook) {
    return this.http.post<IBook>(this.basedUrl + 'books', {...book, id: this.generateUniqueId()}).subscribe((rez) => {
      this.books.update(curr => [...curr, rez]);
    });
  }

  updateBook(book: IBook) {
    return this.http.put<IBook>(this.basedUrl + `books/${book.id}`, book).subscribe((rez) => {

      this.books.update(curr => [...curr].map(c => {
        if(c.id === book.id){
          c = book
          return c;
        }
        return c;
      }));
    });
  }

  deleteBook(id: string) {
    return this.http.delete<IBook>(this.basedUrl + `books/${id}`).subscribe((rez) => {

      this.books.update(curr => [...curr].filter(c => c.id !== id));
    });
  }
}
