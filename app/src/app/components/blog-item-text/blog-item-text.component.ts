import {Component, Input} from '@angular/core';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
  @Input() text?: string;
}
