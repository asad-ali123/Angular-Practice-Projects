import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimony',
  imports: [CommonModule],
  templateUrl: './testimony.component.html',
  styleUrl: './testimony.component.css'
})
export class TestimonyComponent {
  testimonials: string[] = ['Avery Holmes', 'Craig Ramirez', 'Landon Stephens', 'Leah Ward']
}
