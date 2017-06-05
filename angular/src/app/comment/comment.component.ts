import {Component, Input } from '@angular/core';
import {CommentInterface} from '../models/comment';

@Component({
  selector: 'app-content',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  @Input() public comment: CommentInterface;
}
