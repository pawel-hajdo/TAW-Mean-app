import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [DataService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {

  public postData = {
    "title": '',
    "text": '',
    "image": ''
  };

  constructor(public dataService: DataService, public router: Router) {
  }

  addPost(){
    return this.dataService.addPost(this.postData).subscribe(()=>{
      this.router.navigate(['/blog']);
    });

  }
}
