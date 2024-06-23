import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BlogComponent} from "./components/blog/blog.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public counter = 0;

  add() {
    this.counter++;
  }

  remove() {
    this.counter--;
  }
}
