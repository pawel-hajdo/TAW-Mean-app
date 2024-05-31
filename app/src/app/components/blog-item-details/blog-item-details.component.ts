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
  public image: string = '';
  public text: string = '';

  constructor(private service: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        id = params.get('id');
      });

    this.service.getById(id).subscribe((res: any) => {
      this.image = res['image'];
      this.text = res['text'];
    })
  }
}
