import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServicesService } from '../../Services/services.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  servicesService = inject(ServicesService);
  services: { title: string, image: string, description: string }[] = [];

  ngOnInit() {
    this.services = this.servicesService.services;
  }
}