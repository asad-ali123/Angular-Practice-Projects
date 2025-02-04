import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-tesk-detail',
  imports: [],
  templateUrl: './tesk-detail.component.html',
  styleUrl: './tesk-detail.component.css'
})
export class TeskDetailComponent {

  @Output() closeDetail: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() currentTaskDetails: Task | null = null;

  onCloseDetail() { this.closeDetail.emit(false); }
}
