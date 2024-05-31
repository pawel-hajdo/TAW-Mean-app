import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent {
  public image: string = 'http://osnews.pl/wp-content/uploads/2016/06/it-grafika.jpg';
  public text: string = 'Tytuł';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(`BlogItemDetailsComponent initialized with ID: ${id}`);
  }
}
