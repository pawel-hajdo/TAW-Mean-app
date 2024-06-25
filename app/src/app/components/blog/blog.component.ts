import {Component, Input, OnInit} from '@angular/core';
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {FilterTextPipe} from "../../pipes/filter-text.pipe";
import {SearchBarComponent} from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, HttpClientModule, FilterTextPipe, SearchBarComponent],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  @Input() filterText: string = "";
  public items$: any;

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    })
  }
}
