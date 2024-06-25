import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import { Router } from '@angular/router';
import {Location, NgIf} from '@angular/common';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [HttpClientModule, NgIf],
  providers: [DataService, AuthService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent {
  public image: string = '';
  public text: string = '';
  private id: string = '';
  constructor(private service: DataService, private route: ActivatedRoute,   private location: Location,   private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: any) => {
        this.id = params.get('id');
      });

    this.service.getById(this.id).subscribe((res: any) => {
      this.image = res['image'];
      this.text = res['text'];
    })
  }

  goBack() {
    this.location.back();
  }

  confirmDelete() {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten post?');
    if (confirmed) {
      this.deletePost();
    }
  }

  deletePost() {
    this.service.deleteById(this.id).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        this.router.navigate(['/blog']);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
