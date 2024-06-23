import { Routes } from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {BlogItemDetailsComponent} from "./components/blog-item-details/blog-item-details.component";
import {BlogHomeComponent} from "./components/blog-home/blog-home.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: BlogHomeComponent
  },
  {
    path: 'blog/detail/:id',
    component: BlogItemDetailsComponent
  }
];
