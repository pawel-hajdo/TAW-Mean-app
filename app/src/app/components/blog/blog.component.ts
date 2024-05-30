import { Component } from '@angular/core';
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  public items: any;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.items = this.service.getAll();
  }
}
