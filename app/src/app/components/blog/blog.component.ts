import {Component, OnInit} from '@angular/core';
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {response} from "express";

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogItemComponent, CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
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
