import { Routes } from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {BlogItemDetailsComponent} from "./components/blog-item-details/blog-item-details.component";

export const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: 'blog/details/:id',
    component: BlogItemDetailsComponent
  }
];
