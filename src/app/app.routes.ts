import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    loadComponent: () => import("./pages/books-page/books-page.component").then(c => c.BooksPageComponent)
  },
];
