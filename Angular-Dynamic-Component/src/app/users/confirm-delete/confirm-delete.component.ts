import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../Models/User';

@Component({
  selector: 'app-confirm-delete',
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  @Input() userToDelete !: User;

  @Output() onConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirmationBtnClicked(value : boolean){
    this.onConfirmation.emit(value);
  }
}
